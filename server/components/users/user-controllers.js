const User = require("./user-model");

exports.userGetAll = async (req, res) => {
	try {
		const users = await User.find({});

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.userRegister = async (req, res) => {
	try {
		const registeredUser = await User.findOne({email: req.body.email}).exec();
		if (registeredUser) {
			res.status(409).json({message: "User already registered"});
		} else {
			const newUser = await new User({
				name: req.body.name,
				email: req.body.email,
				passwordHash: req.body.password
			}).save();
			res.status(201).json({name: newUser.name, email: newUser.email});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
