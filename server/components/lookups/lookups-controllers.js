const Post = require("../posts/post-model");
const {replaceTagNameWithTagId} = require("../utils");

exports.lookupQuestions = async (req, res) => {
	try {
		const tags = await replaceTagNameWithTagId(req.body.tags);
		const questions = await Post.find({isQuestion: true, tags: {$in: tags}}).exec();
		res.status(200).json(questions);
	} catch (error) {
		res.status(500).json(error);
	}
};
