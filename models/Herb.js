const mongoose = require("mongoose");

const herbSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        scientificName: {
            type: String,
            required: true,
            trim: true,
        },
        family: {
            type: String,
            required: true,
            trim: true,
        },
        commonNames: [
            {  
                type: String,
                trim: true,
            },
        ],
        continents: [
            {
                type: String,
                trim: true,
            },
        ],
        countries: [
            {
                type: String,
                trim: true,
            },
        ],
        nativeRegions: [
            {
                type: String,
                trim: true,
            },
        ],
        traditionalUses: [
            {
                type: String,
                trim: true,
            },
        ],
        usageCategories: [
            {
                type: String,
                trim: true,
            },
        ],
        partsUsed: [
            {
                type: String,
                trim: true,
            },
        ],
        preparationMethods: [
            {
                type: String,
                trim: true,
            },
        ],
        description: {
            type: String,
            trim: true,
        },
        properties: [
            {
                type: String,
                trim: true,
            },
        ],
        image: {
            type: String,
            trim: true,
        },
        source: {
            type: String,
            trim: true,
        },
        sourceId: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Herb", herbSchema);