const express = require("express");

const { getAllHerbs } = require("../controllers/herbController");

const router = express.Router();

router.get("/", getAllHerbs);

module.exports = router;