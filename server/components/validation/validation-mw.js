const {validationResult} = require("express-validator/check");

exports.checkValidation = (req, res, next) => {
	if (!validationResult(req).isEmpty()) {
		const validationErrors = validationResult(req).array();
		return res.status(422).json({validationErrors});
	}
	next();
};
