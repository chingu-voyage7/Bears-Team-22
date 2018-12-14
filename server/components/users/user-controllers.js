const User = require("./user-model");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});

		if (users.length > 0) {
			res.status(200).json({users});
		} else {
			res.status(200).json({message: "No users yet!"});
		}
	} catch (error) {
		res.status(500).json({error});
	}
};

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

exports.loginUser = async (req, res) => {
	try {
		const user = await User.findOne({name: req.body.name});

		if (user && user.validatePassword(req.body.password)) {
			res.status(200).json({message: "Login successful"});
		} else {
			res.status(401).json({message: "Login failed"});
		}
	} catch (error) {
		res.status(500).json({error});
	}
};
