const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            trim: true,
        },
        herb: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Herb",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", commentSchema);