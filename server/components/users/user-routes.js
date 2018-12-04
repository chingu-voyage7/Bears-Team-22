const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {userGetAll} = require("./user-controllers");

router.get("/user-get-all", userGetAll);

module.exports = router;
