const {
  registerQuery,
  loginQuery,
  getUserByIdQuery,
} = require("../queries/userQueries");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await registerQuery(firstName, lastName, email, password);
    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginQuery(email, password);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await getUserByIdQuery(req.user.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
