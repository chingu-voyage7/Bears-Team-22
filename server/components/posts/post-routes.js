const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {getAllPosts, createPost} = require("./post-controllers");

router.get("/post/get-all", getAllPosts);
router.post("/post/create", createPost);

module.exports = router;
