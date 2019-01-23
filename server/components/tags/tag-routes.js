const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {getTags, getTagQuestions} = require("./tag-controllers");

router.get("/browse", getTags);
router.get("/browse/:tagName", getTagQuestions);

module.exports = router;
