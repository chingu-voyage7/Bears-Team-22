const express = require("express");

const {getAllPosts, createPost} = require("./post-controllers");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/get-all", getAllPosts);
router.post("/create", createPost);

module.exports = router;
