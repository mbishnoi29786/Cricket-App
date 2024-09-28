const express = require("express");
const router = express.Router();

const playerLogic = require("../controllers/players");
const validate = require("../validator/validate");
const authEncrypt = require("../auth/authEncrypt");

// create new player account
router.post("/create", authEncrypt, validate.validateCreateNewPlayer, playerLogic.create_new_player);

// fetch all players
router.get("/fetch", playerLogic.fetch_players);

module.exports = router;
