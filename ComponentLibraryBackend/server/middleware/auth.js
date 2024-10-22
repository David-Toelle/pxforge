const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expecting 'Bearer token'

  try {
    const decoded = jwt.verify(token, process.env.WEB_TOKEN);
    req.user = decoded; // Attach user information to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
