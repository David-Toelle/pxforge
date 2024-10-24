const { prisma } = require("../shared/shared");

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

module.exports = {
  createPackage,
  getPackagesByUser,
  getPackageById,
  updatePackage,
  deletePackage,
};
