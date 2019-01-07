const Thread = require('./thread-model');

exports.getThread = async (req, res) => {
    const {questionId} = req.params;
	try {
		let thread = await Thread.findOne({question: questionId}).populate({path:'replies', populate: {path: 'authorId'}});
		res.status(200).json({thread});
	} catch (error) {
		res.status(500).json(error);
	}
};
