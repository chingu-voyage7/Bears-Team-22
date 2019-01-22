const Tag = require("./tag-model");
const {Question} = require("../content/content-model");

exports.getTagQuestions = async (req, res) => {
	const {tagName} = req.params;
	const {_id: tagId} = await Tag.findOne({name: tagName}).select("-__v");

	try {
		const questions = await Question
			.find({tags: tagId})
			.sort({createdAt: "desc"})
			.limit(20)
			.select("-__v");
	
		res.status(200).json({questions});
	} catch (error) {
		res.status(500).json(error);
	}
};
