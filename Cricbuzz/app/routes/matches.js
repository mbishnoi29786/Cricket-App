const express = require("express");
const router = express.Router();

const matchesLogic = require("../controllers/matches");
const validate = require("../validator/validate");
const authMatch = require("../auth/authMatches");
const authUpdateScore = require("../auth/authUpdateScore");
const authEncrypt = require("../auth/authEncrypt");

// fetch all matches
router.get("/fetch", validate.validateFetchMatches, matchesLogic.fetchMatches);

// fetch one match
router.get("/fetchOne", validate.validateFetchOneMatch, matchesLogic.fetchOneMatch);

// fetch analytics
router.get("/fetchAnalytics", validate.validateFetchAnalytics, matchesLogic.fetchAnalytics);

// add new macth
router.post("/add", authEncrypt, validate.validateAddNewMatch, authUpdateScore, matchesLogic.addNewMatch);

// Select next batsman
router.patch("/selectNextBatsman", authEncrypt, validate.validateSelectNextBatsman, authUpdateScore, authMatch, matchesLogic.selectNextBatsman);

// Select next bowler
router.patch("/selectNextBowler", authEncrypt, validate.validateSelectNextBowler, authUpdateScore, authMatch, matchesLogic.selectNextBowler);

// Update score
router.put("/updateScore", authEncrypt, validate.validateUpdateScore, authUpdateScore, authMatch, matchesLogic.updateScore);

// Undo and Update score
router.put("/undoUpdateScore", authEncrypt, authUpdateScore, authMatch, matchesLogic.undoUpdateScore);


module.exports = router;


