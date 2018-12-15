const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {postGetAll, postCreate} = require("./post-controllers");

router.get("/get-all", postGetAll);
router.post("/create", postCreate);

module.exports = router;
