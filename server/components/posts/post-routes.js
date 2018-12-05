const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {postGetAll, postCreate} = require("./post-controllers");

router.get("/post-get-all", postGetAll);
router.post("/post-create", postCreate);

module.exports = router;
