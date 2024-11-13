const {
  createPackage,
  getPackagesByUser,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../queries/packageQueries");
const {
  checkPackageNameAvailability,
  generateComponentFiles,
  bundleWithRollup,
  publishToNpm,
  cleanupPackageFiles,
  unpublishFromNpm,
} = require("../queries/publishingQueries");
const path = require("path");
const { exec } = require("child_process");

// Handle creating a new package
const createPackageHandler = async (req, res) => {
  const { name, description, components } = req.body;
  const userId = req.user.id;

  try {
    console.log("name: ", name);
    console.log("description: ", description);
    console.log("components: ", components);
    const newPackage = await createPackage({
      name,
      description,
      components,
      ownerId: userId,
    });
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create package" });
  }
};

// Handle fetching all packages for a user
const getUserPackagesHandler = async (req, res) => {
  const userId = req.user.id;

  try {
    const packages = await getPackagesByUser(userId);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

// Handle fetching a single package by ID
const getPackageHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const package = await getPackageById(parseInt(id));
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch package" });
  }
};

// Handle updating a package
const updatePackageHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, components } = req.body;

  try {
    const updatedPackage = await updatePackage(parseInt(id), {
      name,
      description,
      components,
    });
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: "Failed to update package" });
  }
};

// Handle deleting a package
const deletePackageHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch package details to construct npm package name
    const packageData = await getPackageById(parseInt(id));
    if (!packageData) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Set the package path and npm package name
    const packagePath = path.resolve(
      `./tmp/${packageData.ownerId}/${packageData.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
    const npmPackageName = `@pxforge/${packageData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    // Attempt npm unpublish
    console.log(`Unpublishing package from npm: ${npmPackageName}`);
    await unpublishFromNpm(packagePath);

    // If successful, delete the package locally
    await deletePackage(parseInt(id));

    // Respond with success
    res
      .status(200)
      .json({ message: "Package successfully deleted from npm and database" });
  } catch (error) {
    console.error("Error during package delete process:", error);
    res.status(500).json({ error: "Failed to delete package" });
  }
};

// Handle publishing a package
const publishPackageHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // 1. Fetch package data
    console.log("fetching package data...");
    const packageData = await getPackageById(id);
    if (!packageData) {
      throw new Error(`Package with ID ${id} not found`);
    }
    console.log("Package data found :) ");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");

    // 2. Set path to package
    console.log("Setting Path...");
    const packagePath = path.resolve(
      `./tmp/${userId}/${packageData.name.toLowerCase().replace(/\s+/g, "-")}`
    );
    console.log("Path Set: ", packagePath);

    // 3. Check if the package name is available on npm
    const packageName = packageData.name.toLowerCase().replace(/\s+/g, "-");
    const isAvailable = await checkPackageNameAvailability(packageName);
    if (!isAvailable) {
      return res
        .status(400)
        .json({ error: "Package name already exists on npm" });
    }

    // 3. Create necessary component files and `index.js`
    console.log("Creating Component Files...");
    await generateComponentFiles(packageData, packagePath);
    console.log("Component Files Created :)");

    // 4. Run Rollup to bundle the components
    console.log("RUNning ROllup....");
    await bundleWithRollup(packagePath);
    console.log("Rollup successful :)");

    // 5. Publish to NPM
    console.log("Publishing to NPM...");
    await publishToNpm(packagePath);
    console.log("Published to NPM :)");

    // 6. Cleanup temporary files
    cleanupPackageFiles(packagePath);

    // 7. Respond to client
    res.status(200).json({ message: "Package published successfully" });
  } catch (error) {
    console.error("Error during package publish process:", error);
    res.status(500).json({ error: "Failed to publish package. try another name" });
  }
};

module.exports = {
  createPackageHandler,
  getUserPackagesHandler,
  getPackageHandler,
  updatePackageHandler,
  deletePackageHandler,
  publishPackageHandler,
};
