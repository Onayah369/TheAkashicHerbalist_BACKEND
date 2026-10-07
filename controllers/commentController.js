const Comment = require("../models/Comment");
const Herb = require("../models/Herb");

const getCommentsByHerb = async (req, res) => {
    try {
        const comments = await Comment.find({
            herb: req.params.herbId,
        })
            .populate("user", "username")
            .sort({ createdAt: -1 });

            res.json({ comments });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching comments",
            error: error.message,
        });
    }
};

const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { herbId } = req.params;

        const herb = await Herb.findById(herbId);

        if (!herb) {
            return res.status(404).json({
                message: "Herb not found",
            });
        }

        const comments = await Comment.create({
            content,
            user: req.user.userId,
            herb: herbId,
        });

        await comment.populate("user", "username");

        res.status(201).json({
            message: "Comment created successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating comment",
            error: error.message,
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            _id: req.params.commentId,
            user: req.user.userId,
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        comment.content = req.body.content;

        await comment.save();
        await comment.populate("user", "username");

        res.json({
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating comment",
            error: error.message,
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.commentId,
            user: req.user.userId,
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        res.json({
            message: "Comment deleted successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting comment",
            error: error.message,
        });
    }
};

module.exports = {
    getCommentsByHerb,
    createComment,
    updateComment,
    deleteComment,
};
