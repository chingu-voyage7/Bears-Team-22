const arrify = require("arrify");

const {Question, Reply} = require("../content/content-model");
const Tag = require("../tags/tag-model");
const Thread = require("../thread/thread-model");
const User = require("../users/user-model");
const {resolveTagNames} = require("../util/tag");

exports.getQuestion = async (req, res) => {
	const {q: query, tags = []} = req.query;
	const parsedTags = tags.map(decodeURIComponent);

	// Split query into words then each word is wrapped in
	// double quotes to allow mongo to recognize those as
	// multiple phrases hence make a AND research instead of
	// OR research (passing the query 'foo bar' will now return
	// the text with 'foo' AND 'bar' instead of 'foo' OR 'bar').
	const queryString = query.split(" ").map(word => `"${decodeURIComponent(word)}"`).join(" ");// TODO: Escape the given input so that the user isn't able to run malicious queries on the database (such as `" (insert bad query here)`).
	let queryIds = [];
	if (tags) {
		const queryTag = arrify(parsedTags);

		queryIds = await resolveTagNames(queryTag);
		queryIds = queryIds.filter(el => Boolean(el));
	}

	try {
		const queryData = await Question.find({$text: {$search: queryString}}).explain(true);
		const stemmedWords = queryData[0].queryPlanner.winningPlan.inputStage.parsedTextQuery.terms;

		const result = await Question
			.find({
				$or: [
					{$text: {$search: queryString}},
					{tags: {$elemMatch: {$in: queryIds}}}
				]
			})
			.sort({createdAt: "desc"})
			.limit(20)
			.select("-__v");

		res.status(200).json({result, stemmedWords});
	} catch (error) {
		res.status(500).json(error);
	}
};

// TEMP: This endpoint won't exist in production. It's used for testing purposes only.
exports.prepopulate = async (req, res) => {
	try {
		const mockData = await User.findOne({name: "frank"});
		if (mockData) {
			return res.status(200).json({message: "Db was already filled with mock data"});
		}

		const frank = await User.create({name: "frank", email: "frank@test.com", firebaseId: "nsN9j7ln7rQk7VBTr0WRSe7vo8L2"});
		const jhon = await User.create({name: "jhon", email: "jhon@test.com", firebaseId: "nsN9j7ln72bd7VBTr0WRSe7vo8L2"});

		const mockTags = await Tag.create([
			{name: "first"},
			{name: "Beta"},
			{name: "Chi"},
			{name: "Delta"},
			{name: "Eta"},
			{name: "frank"},
			{name: "fourth"},
			{name: "Gamma"},
			{name: "Happy"},
			{name: "Joy"},
			{name: "Iota"},
			{name: "Kappa"},
			{name: "Lambda"},
			{name: "Mu"},
			{name: "Nu"},
			{name: "Omicron"},
			{name: "Phi"},
			{name: "Quentin"},
			{name: "Rho"},
			{name: "Signma"},
			{name: "Tau"},
			{name: "Upsilon"},
			{name: "Veritas"},
			{name: "Wombat"},
			{name: "Xi"},
			{name: "Yawn"},
			{name: "Zorro"}
		]);
		const questions = await Question.create([
			{title: "This is the first title", body: "This is the first body", authorId: frank._id, tags: [mockTags[0]._id, mockTags[5]._id]},
			{title: "This is the second title", body: "This is the second body", authorId: frank._id},
			{title: "This is the third title", body: "This is the third body", authorId: jhon._id},
			{title: "This is the fourth title", body: "This is the fourth body", authorId: frank._id, tags: [mockTags[5]._id, mockTags[6]._id]}
		]);
		const replies = await Reply.create([
			{body: "This is the first reply to the first question", authorId: jhon._id, questionId: questions[0]._id},
			{body: "This is the first reply to the second question", authorId: jhon._id, questionId: questions[1]._id},
			{body: "This is the first reply to the third question", authorId: frank._id, questionId: questions[2]._id},
			{body: "This is the second reply to the first question", authorId: frank._id, questionId: questions[0]._id},
			{body: "This is the third reply to the first question", authorId: jhon._id, questionId: questions[0]._id},
			{body: "This is the second reply to the third question", authorId: jhon._id, questionId: questions[2]._id}
		]);

		console.log("questions created", questions);

		const threads = [];
		for (const question of questions) {
			threads.push({
				question: question._id,
				replies: replies.filter(reply => reply.questionId === question._id).map(el => el._id)
			});
		}

		await Thread.create(threads);

		return res.status(200).json({message: "The database was successfully populated."});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
