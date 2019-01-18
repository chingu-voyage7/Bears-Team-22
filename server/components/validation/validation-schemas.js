const Joi = require("joi");

exports.questionSchema = Joi.object({
	type: Joi.string()
		.valid("question")
		.trim()
		.required(),
	title: Joi.string()
		.trim()
		.required(),
	body: Joi.string()
		.trim()
		.min(20)
		.required(),
	tags: Joi.array()
});

exports.replySchema = Joi.object({
	type: Joi.string()
		.valid("reply")
		.trim()
		.required(),
	body: Joi.string()
		.trim()
		.min(20)
		.required(),
	questionId: Joi.string()
		.regex(/^[a-f\d]{24}$/i)
});
