const { prisma, jwt } = require("../shared/shared");

// Query to create a component
const createComponent = async (data) => {
  return await prisma.component.create({
    data,
  });
};

// Query to fetch components for a specific user
const getComponentsByUser = async (userId) => {
  return await prisma.component.findMany({
    where: {
      ownerId: userId,
    },
  });
};

// Query to fetch a single component by ID
const getComponentById = async (id) => {
  return await prisma.component.findUnique({
    where: {
      id: id,
    },
  });
};

// Query to update a component
const updateComponent = async (id, data) => {
  return await prisma.component.update({
    where: {
      id: id,
    },
    data,
  });
};

// Query to delete a component
const deleteComponent = async (id) => {
  return await prisma.component.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createComponent,
  getComponentsByUser,
  getComponentById,
  updateComponent,
  deleteComponent,
};
