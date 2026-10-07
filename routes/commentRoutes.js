const express = require("express");

const {
    getCommentsByHerb,
    createComment,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/herb/:herbId", getCommentsByHerb);

router.post("/herb/:herbId", protect, createComment);

router.put("/:commentId", protect, updateComment);

router.delete("/:commentId", protect, deleteComment);

module.exports = router;
