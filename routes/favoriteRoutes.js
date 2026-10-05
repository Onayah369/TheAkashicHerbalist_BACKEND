const express = require("express");
const {
    getFavorites,
    addFavorite,
    removeFavorite,
} = require("../controllers/favoriteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/:herbId", protect, addFavorite);
router.delete("/:herbId", protect, removeFavorite);

module.exports = router;