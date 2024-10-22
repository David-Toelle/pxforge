const {
  createPackage,
  getPackagesByUser,
  getPackageById,
  updatePackage,
  deletePackage,
  publishPackage,
} = require("../queries/packageQueries");

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
    await deletePackage(parseInt(id));
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete package" });
  }
};

// Handle publishing a package
const publishPackageHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await publishPackage(id, userId);
    res.status(200).json({ message: "Package published successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to publish package" });
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
