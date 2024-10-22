require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/auth.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// import routes
const userRoutes = require("./routes/userRoutes.js");
const componentRoutes = require("./routes/componentRoutes");
const packageRoutes = require("./routes/packageRoutes"); // Import package routes

// use routes
app.use("/auth", userRoutes);
app.use("/api/components", authMiddleware, componentRoutes);
app.use("/api/packages", authMiddleware, packageRoutes); // Use package routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
