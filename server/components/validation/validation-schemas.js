const {body} = require("express-validator/check");
const mongoose = require("mongoose");

exports.validate = path => {
	switch (value) {
		case "post-question":
			return [
				body("type", "unknown type").isString().matches(/question/),
				body("title", "Please provide a title")
					.not().isEmpty()
					.trim()
					.escape(),
				body("body", "Please provide a body")
					.not().isEmpty()
					.isLength({min: 20}).withMessage("body must be at least 20 characters long")
					.trim()
					.escape(),
				body("tags").optional().isArray()
			];
		case "thread": // Happens when a user posts a reply.
			return [
				body("type", "unknown type").isString().matches(/reply/),
				body("body", "Please provide a body")
					.not().isEmpty()
					.isLength({min: 20}).withMessage("body must be at least 20 characters long")
					.trim()
					.escape(),
				body("authorId").not().isEmpty()
					.custom(value => {
						return mongoose.Types.ObjectId(value) === value; // eslint-disable-line new-cap
					})
					.customSanitizer(value => {
						return mongoose.Types.ObjectId(value); // eslint-disable-line new-cap
					})
			];
		default:
			break;
	}
};
