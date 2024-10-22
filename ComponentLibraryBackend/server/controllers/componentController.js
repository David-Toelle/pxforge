const {
  createComponent,
  getComponentsByUser,
  getComponentById,
  updateComponent,
  deleteComponent,
} = require("../queries/componentQueries");

// Handle creating a new component
const createComponentHandler = async (req, res) => {
  const { name, description, code } = req.body;
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user
  
  try {
    const component = await createComponent({
      name,
      description,
      code,
      ownerId: userId,
    });
    res.status(201).json(component);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to create component" });
  }
};

// Handle fetching all components for a user
const getUserComponentsHandler = async (req, res) => {
  const userId = req.user.id;

  try {
    const components = await getComponentsByUser(userId);
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch components" });
  }
};

// Handle fetching a single component by ID
const getComponentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const component = await getComponentById(parseInt(id));
    if (!component) {
      return res.status(404).json({ error: "Component not found" });
    }
    res.status(200).json(component);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch component" });
  }
};

// Handle updating a component
const updateComponentHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, code } = req.body;

  try {
    const updatedComponent = await updateComponent(parseInt(id), {
      name,
      description,
      code,
    });
    res.status(200).json(updatedComponent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update component" });
  }
};

// Handle deleting a component
const deleteComponentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteComponent(parseInt(id));
    res.status(200).json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete component" });
  }
};

module.exports = {
  createComponentHandler,
  getUserComponentsHandler,
  getComponentHandler,
  updateComponentHandler,
  deleteComponentHandler,
};
