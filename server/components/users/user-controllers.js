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
