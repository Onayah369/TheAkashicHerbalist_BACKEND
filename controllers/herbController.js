const Herb = require("../models/Herb");

const getAllHerbs = async (req, res) => {
    try {
        const herbs = await Herb.find();


        res.json(herbs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching herbs", error: error.message });
    }
};

const getHerbById = async (req, res) => {
    try {
        const herb = await Herb.findById(req.params.id);
        if (!herb) {
            return res.status(404).json({ message: "Herb not found" });
        }
        res.json(herb);
    } catch (error) {
        res.status(500).json({ message: "Error fetching herb", error: error.message });
    }
};

module.exports = { getAllHerbs, getHerbById };