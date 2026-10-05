const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.get("/me", protect, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user,
    });
});

module.exports = router;