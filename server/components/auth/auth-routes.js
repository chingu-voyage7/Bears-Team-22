const express = require("express");
const passport = require("passport");

const router = express.Router(); // eslint-disable-line new-cap

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (info) {
			return res.send(info.message);
		}
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect("/login");
		}
		req.login(user, err => {
			if (err) {
				next(err);
			}
			return res.redirect("/");
		});
	})(req);
});

router.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) {
			res.status(500).json(err);
		}
		res.redirect("/");
	});
});

router.get("/", (req, res) => res.status(200).json({message: "This is the main route. Get out of here!"}));

module.exports = router;
