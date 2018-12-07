const User = require("./user-model");

exports.userGetAll = async (req, res) => {
	try {
		const users = await User.find({});

		if (users.length > 0) {
			res.status(200).json(users);
		} else {
			res.status(200).json({message: "No users yet!"});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.userRegister = async (req, res) => {
	try {
		const newUser = await new User({
			name: req.body.name,
			email: req.body.email,
			passwordHash: req.body.password
		}).save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.userFakeLogin = async (req, res) => {
	try {
		const user = await User.findOne({name: req.body.name});
		if (user) {
			const isAuth = user.isPasswordValid(req.body.password);
			res.status(200).json({isAuth});
		} else {
			res.status(404).json({message: "User not found"});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
