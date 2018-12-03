const express = require("express");
const router = express.Router();

const { userGetAll } = require("./userControllers");

router.get("/user-get-all", userGetAll);

module.exports = router;
