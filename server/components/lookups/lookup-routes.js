const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap
const {lookupQuestions} = require("./lookups-controllers");

router.post("/lookup-questions", lookupQuestions);

module.exports = router;
