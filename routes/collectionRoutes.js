const express = require("express");

const {
    getCollections,
    createCollection,
    addHerbToCollection,
    removeHerbFromCollection,
    deleteCollection,
} = require("../controllers/collectionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCollections);

router.post("/", protect, createCollection);

router.post(
    "/:collectionId/herbs/:herbId",
    protect,
    addHerbToCollection
);

router.delete(
    "/:collectionId/herbs/:herbId",
    protect,
    removeHerbFromCollection
);

router.delete(
    "/:collectionId",
    protect,
    deleteCollection
);

module.exports = router;

