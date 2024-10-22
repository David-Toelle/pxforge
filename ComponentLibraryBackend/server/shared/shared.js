const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

module.exports = {
  prisma,
  jwt,
  bcrypt,
};
