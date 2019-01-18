const joi = require("joi");
const validationSchemas = require("./validation-schemas");

const validator = (req, res, next) => {
	let schema = {};
	switch (req.body.type) {
		case "question":
			schema = validationSchemas.questionSchema;
			break;
		case "reply":
			schema = validationSchemas.replySchema;
			break;
		default:
			break;
	}

	joi.validate(
		req.body,
		schema,
		{
			abortEarly: false,
			allowUnknown: false
		},
		(err, validData) => {
			if (err) {
				return res.status(422).json({validationErrors: err});
			}
			req.body = validData;
			next();
		}
	);
};

module.exports = validator;
