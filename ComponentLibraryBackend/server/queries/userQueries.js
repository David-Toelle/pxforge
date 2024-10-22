const { prisma, jwt } = require("../shared/shared");
const bcrypt = require("bcrypt");

const registerQuery = async (firstName, lastName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.WEB_TOKEN, {
    expiresIn: "1h",
  });
  return { ...user, token };
};

const loginQuery = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, process.env.WEB_TOKEN, {
    expiresIn: "1h",
  });
  return { ...user, token };
};

const getUserByIdQuery = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

module.exports = { registerQuery, loginQuery, getUserByIdQuery };
