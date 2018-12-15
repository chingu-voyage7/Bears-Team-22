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

exports.lookupThread = async (req, res) => {
	const thread = [];
	let actualPost = {};
	let actualId = req.params.id;
	do {
		try {
			actualPost = await Post.findById(actualId).exec();
			actualId = actualPost.replyId;
			thread.push(actualPost);
		} catch(error) {
			res.status(500).json(error);
		}
	} while (actualPost.replyId);
	
	res.status(200).json(thread);
};
