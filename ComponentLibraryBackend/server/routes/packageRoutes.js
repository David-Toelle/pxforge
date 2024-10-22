const express = require("express");
const {
  createPackageHandler,
  getUserPackagesHandler,
  getPackageHandler,
  updatePackageHandler,
  deletePackageHandler,
  publishPackageHandler, // Handler for publishing a package
} = require("../controllers/packageController");

const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Route to create a new package
router.post("/", authMiddleware, createPackageHandler);

// Route to get all packages for the current user
router.get("/", authMiddleware, getUserPackagesHandler);

// Route to get a specific package by ID
router.get("/:id", authMiddleware, getPackageHandler);

// Route to update a package by ID
router.put("/:id", authMiddleware, updatePackageHandler);

// Route to delete a package by ID
router.delete("/:id", authMiddleware, deletePackageHandler);

// Route to publish a package (publish the package to npm)
router.post("/:id/publish", authMiddleware, publishPackageHandler);

module.exports = router;
