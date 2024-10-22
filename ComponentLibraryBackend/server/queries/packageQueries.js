const { prisma } = require("../shared/shared");
const { exec, spawn } = require("child_process");

const libnpmpublish = require("libnpmpublish");
const fs = require("fs");
const path = require("path");
// Query to create a package
const createPackage = async (data) => {
  const { name, description, components, ownerId } = data;

  try {
    return await prisma.package.create({
      data: {
        name,
        description,
        ownerId, // Assuming this comes from the request user data
        components: {
          connect: components.map((componentId) => ({ id: componentId })),
        },
      },
    });
  } catch (error) {
    // Specific handling for record not found error (P2025)
    if (error.code === "P2025") {
      throw new Error(
        `One or more component ids were not found: ${error.meta}`
      );
    } else {
      // Generic error handling
      throw new Error(`Error creating package: ${error.message}`);
    }
  }
};

// Query to fetch packages for a specific user
const getPackagesByUser = async (userId) => {
  return await prisma.package.findMany({
    where: { ownerId: userId },
    include: { components: true }, // Include components in the result
  });
};

// Query to fetch a package by ID
const getPackageById = async (id) => {
  return await prisma.package.findUnique({
    where: { id: parseInt(id) },
    include: { components: true }, // Include components in the result
  });
};

// Query to update a package
const updatePackage = async (id, data) => {
  const { name, description, components } = data;

  return await prisma.package.update({
    where: { id: id },
    data: {
      name,
      description,
      components: {
        set: components.map((componentId) => ({ id: componentId })),
      },
    },
  });
};

// Query to delete a package
const deletePackage = async (id) => {
  return await prisma.package.delete({
    where: { id: id },
  });
};

// Function to handle publishing a package to NPM
const publishPackage = async (packageId, userId) => {
  console.log("Starting the publish process for Package ID:", packageId);

  try {
    // Fetch package data from your database (replace with your implementation)
    const packageData = await getPackageById(packageId);
    if (!packageData) {
      throw new Error(`Package with ID ${packageId} not found`);
    }

    const packagePath = path.resolve(
      `./user-packages/${userId}/${packageData.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
    const packageJsonPath = path.join(packagePath, "package.json");

    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error("package.json not found, cannot publish");
    }

    // Use exec to run npm publish
    console.log("Publishing the package...");
    exec(
      "npm publish --access public",
      { cwd: packagePath },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error during npm publish: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`npm publish stderr: ${stderr}`);
        }
        console.log(`npm publish stdout: ${stdout}`);
      }
    );
  } catch (error) {
    console.error("Error during publish process:", error);
  }
};

// Helper function to bundle components for the package
const generateComponentBundle = (packageData) => {
  return packageData.components
    .map((component) => {
      return `
      // ${component.name}
      ${component.code}
    `;
    })
    .join("\n");
};

module.exports = {
  createPackage,
  getPackagesByUser,
  getPackageById,
  updatePackage,
  deletePackage,
  publishPackage,
};
