const express = require("express");

const {getQuestion, populate} = require("./search-controller");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/search", getQuestion);
router.get("/pre-populate", populate);

module.exports = router;
