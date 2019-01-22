const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {getTagQuestions} = require("./tag-controllers");

router.get("/:tagName", getTagQuestions);

module.exports = router;
