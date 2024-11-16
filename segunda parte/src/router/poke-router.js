const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/poke-controller");

router.get("/pokemon/:name", pokemonController.getPokemonController);

module.exports = router;
