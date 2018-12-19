const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {registerUser, loginUser} = require("./user-controllers");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
