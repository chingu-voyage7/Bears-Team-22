const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

const {sessionVerificationMw} = require("../auth/auth-controllers");

const {getUser, updateUser, deleteUser} = require("./user-controllers");

// MOCK ROUTING FOR TESTING
router.get("/get-all", sessionVerificationMw, (req, res) => {
	console.log("route reached");
	res.status(200).json({message: "protected route reached"});
});

router.get("/current-user", sessionVerificationMw, getUser);
router.post("/update-user", sessionVerificationMw, updateUser);
router.delete("/delete-user", sessionVerificationMw, deleteUser);
module.exports = router;
