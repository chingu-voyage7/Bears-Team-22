const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {getAllUsers, registerUser, loginUserFake} = require("./user-controllers");

router.get("/user/get-all", getAllUsers);
router.post("/user/register", registerUser);
router.post("/user/login", loginUserFake);

module.exports = router;
