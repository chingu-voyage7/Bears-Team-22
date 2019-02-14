const {Question} = require("../content/content-model");
const {findTag, findTags} = require("../util/tag");
const Tag = require("./tag-model");

exports.getTags = async (req, res) => {
	const {query} = req.params;

	try {
		const tags = await (query ? findTags(query) : Tag.find())
			.limit(5)
			.select("-__v");

		res.status(200).json({tags});
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getTagQuestions = async (req, res) => {
	const {tagName} = req.params;
	const tag = await findTag(tagName).select("_id");

	if (!tag || !tag._id) {
		res.status(404).json({error: "Couldn't find a tag matching the given query."});
		return;
	}

	try {
		const questions = await Question
			.find({tags: tag._id})
			.sort({createdAt: "desc"})
			.limit(20)
			.select("-__v");

		res.status(200).json({questions});
	} catch (error) {
		res.status(500).json(error);
	}
};
