const Herb = require("../models/Herb");

const getAllHerbs = async (req, res) => {
    try {
        const herbs = await Herb.find();

        console.log("Herbs found:", herbs.length);
        console.log("Is array:", Array.isArray(herbs));
        console.log("Type:", typeof herbs);
        console.log("Value:", herbs);


        res.json(herbs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching herbs", error: error.message });
    }
};

module.exports = { getAllHerbs };