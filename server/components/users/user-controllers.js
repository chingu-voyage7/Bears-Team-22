const User = require('./user-model');

exports.getUser = (req, res) => res.status(200).json(req.knowledgeUserInfo);

// TODOS: user-delete and user-update method

exports.updateUser = async (req, res) => {
	if (req.body.email || req.body.password) {
		try {
			await req.firebaseServer.auth().updateUser(req.knowledgeUserInfo.uid, req.body);
		} catch (error) {
			console.error('fail', error);
		}
	}

	try {
		const updatedUser = await User.findByIdAndUpdate({firebaseId: req.knowledgeUserInfo.uid}, {$set: req.body}, {new: true, runValidators: true});

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
		await User.findByIdAndDelete({firebaseId: req.knowledgeUserInfo.uid});
		res.status(204).end();
	} catch (error) {
		console.error('fail', error);
		res.status(500).json(error);
	}
};
