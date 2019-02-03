const express = require("express");

const {sessionVerificationMw} = require("../auth/auth-controllers");
const {getUser} = require("./user-controllers");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/current-user", sessionVerificationMw, getUser);

module.exports = router;
