const express = require("express");

const {validate} = require("../validation/validation-schemas");
const {checkValidation} = require("../validation/validation-mw");
const {sessionVerificationMw} = require("../auth/auth-controllers");
const {createContent} = require("./content-controller");

const router = express.Router(); // eslint-disable-line new-cap

router.post("/create", validate("post-question"), checkValidation, sessionVerificationMw, createContent);
module.exports = router;
