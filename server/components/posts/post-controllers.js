const { replaceTagNameWithTagId } = require("../utils");
const Post = require("./post-model");

exports.getAllPosts = async (req, res) => {
	const MAX_LIMIT = 50;
	const limit = parseInt(req.query.num, 10) || MAX_LIMIT;

	try {
		const posts = await Post.find({}).limit(Math.min(Math.max(limit, 0), MAX_LIMIT));

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.createPost = async (req, res) => {
	try {
		const tags = await replaceTagNameWithTagId(req.body.tags);

		const newPost = await new Post({
			title: req.body.title,
			body: req.body.body,
			isQuestion: req.body.isQuestion,
			tags,
			authorId: "5c07a5a54a9d0c0012cd8b35" // Fake mongo id, the real one must come from auth
		}).save();

		/// Update the `replyId` property of the previous post with the `id` of the newly generated one.
		if (req.body.superPostId) {
			await Post.findByIdAndUpdate(req.body.superPostId, { $set: { replyId: newPost._id } });
		}
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ error });
	}
};
