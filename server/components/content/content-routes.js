const express = require("express");

const {sessionVerificationMw} = require("../auth/auth-controllers");
const {createContent} = require("./content-controller");

const router = express.Router(); // eslint-disable-line new-cap

router.post("/create", sessionVerificationMw, createContent);
module.exports = router;
