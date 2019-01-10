const Thread = require('./thread-model');

exports.getThread = async (req, res) => {
	const {questionId} = req.params;
	try {
		const thread = await Thread.findOne({question: questionId}).populate({path: 'replies', select: '-__v', populate: {path: 'authorId', select: '-__v -firebaseId'}}).select('-__v');
		res.status(200).json({thread});
	} catch (error) {
		res.status(500).json(error);
	}
};
