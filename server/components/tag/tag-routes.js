const express = require("express");

const {getTags} = require("./tag-controller");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/get-all", getTags);

module.exports = router;
