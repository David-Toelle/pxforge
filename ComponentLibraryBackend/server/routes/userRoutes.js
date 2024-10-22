const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const { register, login, getMe } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
