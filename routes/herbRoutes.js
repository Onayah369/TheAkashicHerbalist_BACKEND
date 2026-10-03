const express = require("express");

const { getAllHerbs, getHerbById  } = require("../controllers/herbController");

const router = express.Router();

router.get("/", getAllHerbs);
router.get("/:id", getHerbById);

module.exports = router;