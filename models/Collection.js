const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        herbs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Herb",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Collection", collectionSchema);