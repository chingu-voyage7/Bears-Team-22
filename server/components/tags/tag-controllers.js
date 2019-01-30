const {Question} = require("../content/content-model");
const Tag = require("./tag-model");

exports.getTags = async (req, res) => {
	const {query} = req.params;
	const findOptions = query ? [{
		name: {
			$regex: query,
			$options: "i"
		}
	}] : [];

	try {
		const tags = await Tag
			.find(...findOptions)
			.limit(5)
			.select("-__v");

		res.status(200).json({tags});
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getTagQuestions = async (req, res) => {
	const {tagName} = req.params;
	const tagId = await Tag.findOne({name: {
		$regex: tagName,
		$options: "i"
	}}).select("_id");

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
