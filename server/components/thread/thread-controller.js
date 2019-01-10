const Thread = require("./thread-model");

exports.getThread = async (req, res) => {
	const {questionId} = req.params;
	try {
<<<<<<< HEAD
		const thread = await Thread.findOne({question: questionId}).populate({path: 'replies', select: '-__v', populate: {path: 'authorId', select: '-__v -firebaseId'}}).select('-__v');
=======
		const thread = await Thread.findOne({question: questionId}).populate({path: "replies", select: "-__v", populate: {path: "authorId", select: "-__v"}}).select("-__v");
>>>>>>> 3518b17b305f1c8da8aefecc92d8e1548c3ca01e
		res.status(200).json({thread});
	} catch (error) {
		res.status(500).json(error);
	}
};
