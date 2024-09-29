const express = require("express");
const router = express.Router();

const usersLogic = require("../controllers/users");
const validate = require("../validator/validate");
const authEncrypt = require("../auth/authEncrypt");

// fetch
router.get("/fetch", usersLogic.fetch);

// signup
router.post("/signup", authEncrypt, validate.validateSignupUser, usersLogic.signup);

// login
router.post("/login", authEncrypt, validate.validateLoginUser, usersLogic.login);

module.exports = router;
