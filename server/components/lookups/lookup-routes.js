const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap
const {lookupQuestions, lookupThread} = require("./lookups-controllers");

router.get('/thread/:id', lookupThread);
router.post("/questions", lookupQuestions);

module.exports = router;
