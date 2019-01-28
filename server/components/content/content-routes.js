const express = require("express");

const validator = require("../validation/validation-mw");
const {sessionVerificationMw} = require("../auth/auth-controllers");
const {createContent} = require("./content-controller");

const router = express.Router(); // eslint-disable-line new-cap

router.post("/create",
	validator,
	sessionVerificationMw,
	createContent);

module.exports = router;
