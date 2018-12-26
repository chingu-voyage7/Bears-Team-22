const User = require("./user-model");

exports.registerUser = async (req, res) => {
	try {
		const newUser = await new User({
			name: req.body.name,
			email: req.body.email,
			passwordHash: req.body.password
		}).save();

		res.status(201).json({newUser});
	} catch (error) {
		res.status(500).json({error});
	}
};
