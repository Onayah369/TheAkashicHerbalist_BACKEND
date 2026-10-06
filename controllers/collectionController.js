const Collection = require("../models/Collection");
const Herb = require("../models/Herb");

const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({
            user: req.user.userId,
        }).populate("herbs");

        res.json({ collections });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching collections",
            error: error.message,
        });
    }
};

const createCollection = async (req, res) => {
    try {
        const { name, description } = req.body;

        const collection = await Collection.create({
            name,
            description,
            user: req.user.userId,
        });

        res.status(201).json({
            message: "Collection created successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating collection",
            error: error.message,
        });
    }
};

const addHerbToCollection = async (req, res) => {
    try {
        const { collectionId, herbId } = req.params;

        const collection = await Collection.findOne({
            _id: collectionId,
            user: req.user.userId,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        const herb = await Herb.findById(herbId);

        if (!herb) {
            return res.status(404).json({
                message: "Herb not found",
            });
        }

        if (collection.herbs.some((id) => id.toString() === herbId)) {
            return res.status(400).json({
                message: "Herb is already in this collection",
            });
        }

        collection.herbs.push(herbId);
        await collection.save();

        await collection.populate("herbs");

        res.json({
            message: "Herb added to collection",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding herb to collection",
            error: error.message,
        });
    }
};

const removeHerbFromCollection = async (req, res) => {
    try {
        const { collectionId, herbId } = req.params;

        const collection = await Collection.findOne({
            _id: collectionId,
            user: req.user.userId,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        collection.herbs = collection.herbs.filter(
            (id) => id.toString() !== herbId
        );

        await collection.save();

        await collection.populate("herbs");

        res.json({
            message: "Herb removed from collection",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error removing herb from collection",
            error: error.message,
        });
    }    
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({
            _id: req.params.collectionId,
            user: req.user.userId,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        res.json({
            message: "Collection deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting collection",
            error: error.message,
        });
    }
};

module.exports = {
    getCollections,
    createCollection,
    addHerbToCollection,
    removeHerbFromCollection,
    deleteCollection,
};