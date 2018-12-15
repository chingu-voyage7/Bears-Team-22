const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {getAllUsers, registerUser, loginUser} = require("./user-controllers");

router.get("/get-all", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
