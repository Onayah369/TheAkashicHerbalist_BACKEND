const User = require("../models/User");
const Herb = require("../models/Herb");

const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate("favorites");

        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching favorites",
            error: error.message,
        });
    }
};

const addFavorite = async (req, res) => {
    try {
        const { herbId } = req.params;

        const herb = await Herb.findById(herbId);

        if(!herb) {
            return res.status(404).json({
                message: "Herb not found",
            });
        }

        const user = await User.findById(req.user.userId);

        if (user.favorites.includes(herbId)) {
            return res.status(400).json({
                message: "Herb is already a favorite",
            });
        }

        user.favorites.push(herbId);
        await user.save();

        res.status(201).json({
            message: "Herb added to favorites",
            favorites: user.favorites,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding favorite",
            error: error.message,
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { herbId } = req.params;

        const user = await User.findById(req.user.userId);

        user.favorites = user.favorites.filter(
            (id) => id.toString() !== herbId
        );

        await user.save();

        res.json({
            message: "Herb removed from favorites",
            favorites: user.favorites,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error removing favorite",
            error: error.message,
        });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };