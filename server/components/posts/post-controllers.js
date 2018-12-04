const Post = require("./post-model");

exports.postGetAll = async (req, res) => {
	try {
		const posts = await Post.find({});

		if (posts.length > 0) {
			res.status(200).json(posts);
		} else {
			res.status(200).json({message: "No posts yet!"});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
