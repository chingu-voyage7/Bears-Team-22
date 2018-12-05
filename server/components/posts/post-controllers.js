const Tag = require("../tags/tag-model");
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

exports.postCreate = async (req, res) => {
	/* The tagIds array will be populate of	promises and then
	promiseAll will wait for them to be fullfilled. */

	/* 	This code replace the name of the tag with
	its id ( if exists otherwise it creates one); apparently
	is not possible to save an array of tags ref first assigning
	the name and then substituting directly into the model since even in the pre-hook the array of name is being filtered out. */

	const tagIds = req.body.tags.map(async tag => {
		try {
			const tagDoc = await Tag.findOne({name: tag}).exec();
			if (tagDoc) {
				return tagDoc._id;
			}

			const newTag = await new Tag({name: tag, children: []})
				.save();
			return newTag._id;
		} catch (error) {
			return error;
		}
	});
	const tags = await Promise.all(tagIds);
	try {
		const newPost = await new Post({
			title: req.body.title,
			body: req.body.body,
			isQuestion: true,
			tags,
			authorId: "5c07a5a54a9d0c0012cd8b35" // Fake mongo id, the real one must come from auth
		}).save();
		res.status(200).json(newPost);
	} catch (error) {
		res.status(500).json(error);
	}
};
