const Thread = require("../thread/thread-model");
const {Question, Reply} = require("./content-model");

exports.createContent = async (req, res) => {
	// Used switch to easily implement other types in
	// the future ( comments, featured-articles, whatever..)
	switch (req.body.type) {
		case "question":
			try {
				const question = await new Question({
					title: req.body.title,
					body: req.body.body,
					authorId: req.knowledgeUserInfo.mongoInstance._id,
					tags: req.body.tags
				}).save();
				delete question.__v;
				await new Thread({
					question: question._id,
					replies: []
				}).save();

				res.status(201).json(question);
			} catch (error) {
				console.log(error);
				res.status(500).json({message: "Internal server error: couldn't fulfill the request at the current time", error});
			}

			break;
		case "reply":
			try {
				const reply = await new Reply({
					body: req.body.body,
					authorId: req.knowledgeUserInfo.mongoInstance._id,
					questionId: req.body.questionId
				}).save();
				delete reply.__v;
				await Thread.findOneAndUpdate({question: req.body.questionId}, {$push: {replies: reply._id}});

				res.status(201).json(reply);
			} catch (error) {
				res.status(500).json({message: "Internal server error: couldn't fulfill the request at the current time", error});
			}

			break;
		default:
			res.status(400).json({message: "Invalid content type"});
	}
};
