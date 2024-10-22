const express = require("express");
const {
  createComponentHandler,
  getUserComponentsHandler,
  getComponentHandler,
  updateComponentHandler,
  deleteComponentHandler,
} = require("../controllers/componentController");

const router = express.Router();

// Route to create a component
router.post("/", createComponentHandler);

// Route to get all components for the current user
router.get("/", getUserComponentsHandler);

// Route to get a specific component by ID
router.get("/:id", getComponentHandler);

// Route to update a component by ID
router.put("/:id", updateComponentHandler);

// Route to delete a component by ID
router.delete("/:id", deleteComponentHandler);

module.exports = router;
