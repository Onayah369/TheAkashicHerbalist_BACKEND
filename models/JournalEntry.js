const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        herb: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Herb",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Herb",
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Journal Entry", journalEntrySchema);