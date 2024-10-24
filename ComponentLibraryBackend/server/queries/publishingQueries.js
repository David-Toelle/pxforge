const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const rollup = require("rollup");
const rollupConfig = require("../../rollup.config.js");

// Helper function to create component files
const generateComponentFiles = (packageData, packagePath) => {
  if (!fs.existsSync(packagePath)) {
    fs.mkdirSync(packagePath, { recursive: true });
  }

  // Create individual component files
  packageData.components.forEach((component) => {
    const componentFilePath = path.join(packagePath, `${component.name}.jsx`);
    fs.writeFileSync(componentFilePath, component.code);
  });

  // Create index.js that exports the components
  const indexJsContent = packageData.components
    .map(
      (component) =>
        `export { default as ${component.name} } from './${component.name}.jsx';`
    )
    .join("\n");
  fs.writeFileSync(path.join(packagePath, "index.js"), indexJsContent);

  // **Create package.json**
  const packageJsonContent = {
    name: `@pxforge/${packageData.name.toLowerCase().replace(/\s+/g, "-")}`,
    version: "1.0.0",
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
    console.log("1");
    // Run Rollup using the configuration
    if (!fs.existsSync(path.join(packagePath, "index.js"))) {
      console.log("1111111111");
      throw new Error("Input file does not exist");
    }
    const bundle = await rollup.rollup({
      input: path.join(packagePath, "index.js"),
      plugins: rollupConfig.plugins,
      external: rollupConfig.external,
    });
    console.log("2", bundle);
    console.log("2");
    console.log("Attempting to write bundle with these options:", {
      file: path.join(packagePath, "dist/"),
      format: "es",
    });
    if (fs.existsSync(path.join(packagePath, "dist/index.js"))) {
      console.log("File already exists:");
    } else {
      console.log("File does not exist. Proceeding with writing...");
    }
    await bundle.write({
      file: path.join(packagePath, "dist/index.js"),
      format: "es", // You can also support CommonJS by adding multiple outputs
    });
    console.log("3");

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
};
