const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {postGetAll} = require("./post-controllers");

router.get("/post-get-all", postGetAll);

module.exports = router;
