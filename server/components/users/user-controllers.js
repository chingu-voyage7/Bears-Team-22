const User = require("./user-model");

exports.getUser = (req, res) => res.status(200).json({user: req.knowledgeUserInfo});

exports.updateUser = async (req, res) => {
	try {
		await req.firebaseServer.auth().updateUser(req.knowledgeUserInfo.uid, req.body); // TODO: Explicitly update the modified fields here as well as on Mongo (to avoid possible security issues).
		const updatedUser = await User.findOneAndUpdate({firebaseId: req.knowledgeUserInfo.uid}, {$set: req.body}, {new: true, runValidators: true});

		delete updatedUser.__v;

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		// TODOS: Need to find a way to hold it in sync - A check when the app starts
		// and if one user exists only into one db removing it
		await req.firebaseServer.auth().deleteUser(req.knowledgeUserInfo.uid);
		await User.findOneAndDelete({firebaseId: req.knowledgeUserInfo.uid});

		res.status(204).end();
	} catch (error) {
		console.log("fail", error);
		res.status(500).json(error);
	}
};
