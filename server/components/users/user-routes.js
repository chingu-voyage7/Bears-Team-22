const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {userGetAll, userRegister} = require("./user-controllers");

router.get("/get-all", userGetAll);
router.post("/register", userRegister);

module.exports = router;
