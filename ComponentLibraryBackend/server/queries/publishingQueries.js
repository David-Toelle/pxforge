const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const rollup = require("rollup");
const semver = require("semver"); // Import semver
const { PrismaClient } = require("@prisma/client");
const rollupConfig = require("../../rollup.config.js");

const prisma = new PrismaClient();

// Function to validate that each component file includes a default export
const validateDefaultExport = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent.includes("export default");
};

const generateComponentFiles = async (packageData, packagePath) => {
  if (!fs.existsSync(packagePath)) {
    fs.mkdirSync(packagePath, { recursive: true });
  }

  // Check and update version
  let version = "1.0.0"; // Default version for new packages
  const existingPackage = await prisma.package.findUnique({
    where: { id: packageData.id },
  });

  if (existingPackage) {
    // If updating, increment the version
    version = semver.inc(existingPackage.version, "patch"); // Increment patch version for updates
    await prisma.package.update({
      where: { id: packageData.id },
      data: { version },
    });
  } else {
    // For new packages, initialize the version in the database
    await prisma.package.create({
      data: {
        name: packageData.name,
        version,
        components: {
          create: packageData.components.map((comp) => ({
            name: comp.name,
            code: comp.code,
          })),
        },
      },
    });
  } 

  // Create individual component files and validate default exports
  packageData.components.forEach((component) => {
    const componentFilePath = path.join(packagePath, `${component.name}.jsx`);
    fs.writeFileSync(componentFilePath, component.code);

    // Validate that each component file has a default export
    if (!validateDefaultExport(componentFilePath)) {
      throw new Error(`Component ${component.name} does not have a default export.`);
    }
  });

  // Create index.js with sanitized exports
  const indexJsContent = packageData.components
    .map((component) => {
      // Sanitize component name for a valid export identifier
      const sanitizedName = component.name.replace(/[^a-zA-Z0-9_$]/g, "_");

      return `export { default as ${sanitizedName} } from './${component.name}.jsx';`;
    })
    .join("\n");

  fs.writeFileSync(path.join(packagePath, "index.js"), indexJsContent);

  // Create package.json with the correct version
  const packageJsonContent = {
    name: `@pxforge/${packageData.name.toLowerCase().replace(/\s+/g, "-")}`,
    version: version,
    main: "dist/index.js",
    license: "MIT",
    dependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
  };
  fs.writeFileSync(
    path.join(packagePath, "package.json"),
    JSON.stringify(packageJsonContent, null, 2)
  );
};


// Helper function to bundle components with Rollup
const bundleWithRollup = async (packagePath) => {
  console.log("bundling...", packagePath);
  try {
    if (!fs.existsSync(path.join(packagePath, "index.js"))) {
      throw new Error("Input file does not exist");
    }
    const bundle = await rollup.rollup({
      input: path.join(packagePath, "index.js"),
      plugins: rollupConfig.plugins,
      external: rollupConfig.external,
    });
    await bundle.write({
      file: path.join(packagePath, "dist/index.js"),
      format: "es", // You can also support CommonJS by adding multiple outputs
    });
    console.log("Bundle created successfully!");
  } catch (error) {
    console.error(
      "Error during Rollup initialization:",
      error.stack || error.message || error
    );
    throw error;
  }
};

// Helper function to publish the package using npm
const publishToNpm = (packagePath) => {
  return new Promise((resolve, reject) => {
    exec(
      "npm publish --access public",
      { cwd: packagePath },
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error during npm publish:", error);
          return reject(error);
        }
        console.log("npm publish stdout:", stdout);
        console.error("npm publish stderr:", stderr);
        resolve();
      }
    );
  });
};

const unpublishFromNpm = (packagePath) => {
  return new Promise((resolve, reject) => {
    exec(
      "npm unpublish --force",
      { cwd: packagePath, shell:true },
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error during npm unpublish:", error);
          return reject(error);
        }
        console.log("npm unpublish stdout:", stdout);
        console.error("npm unpublish stderr:", stderr);
        resolve();
      }
    );
  });
};

// Cleanup function to delete temporary files
const cleanupPackageFiles = (packagePath) => {
  fs.rmSync(packagePath, { recursive: true, force: true });
};

// Function to check if package name exists on npm
const checkPackageNameAvailability = async (packageName) => {
  try {
    const url = `https://registry.npmjs.org/${packageName}`;
    await axios.head(url);
    return false; // Package exists
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true; // Package doesn't exist
    }
    throw new Error("Error checking package name availability");
  }
};

module.exports = {
  checkPackageNameAvailability,
  generateComponentFiles,
  bundleWithRollup,
  publishToNpm,
  cleanupPackageFiles,
  unpublishFromNpm,
};
