const Thread = require("./thread-model");

exports.getThread = async (req, res) => {
	const {questionId} = req.params;

	try {
		const thread = await Thread // TODO: Remvoe the `type` field from objects returned here, and rename the `authorId` field to `author`.
			.findOne({question: questionId})
			.populate({
				path: "question",
				select: "-__v"
			})
			.populate({
				path: "replies",
				select: "-__v"
			})
			.select("-__v");

		res.status(200).json({thread});
	} catch (error) {
		res.status(500).json(error);
	}
};
