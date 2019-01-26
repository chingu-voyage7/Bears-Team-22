const mongoose = require("mongoose");
const arrify = require("arrify");

const {Question, Reply} = require("../content/content-model");
const Tag = require("../tags/tag-model");
const Thread = require("../thread/thread-model");
const User = require("../users/user-model");
const {replaceTagNameWithTagId} = require("../utils");

exports.getQuestion = async (req, res) => {
	const {q: query, t: tags} = req.query;
	// Split query into words then each word is wrapped in
	// double quotes to allow mongo to recognize those as
	// multiple phrases hence make a AND research instead of
	// OR research (passing the query 'foo bar' will now return
	// the text with 'foo' AND 'bar' instead of 'foo' OR 'bar').
	const queryString = query.split(" ").map(word => `"${word}"`).join(" ");// TODO: Escape the given input so that the user isn't able to run malicious queries on the database (such as `" (insert bad query here)`).
	let queryIds = [];
	if (tags) {
		const queryTag = arrify(tags); // If a single tag is passed, Express will not parse it into an array

		queryIds = await replaceTagNameWithTagId(queryTag);
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

exports.prepopulate = async (req, res) => {
	try {
		/* 		Await User.deleteMany({});
		await Question.deleteMany({});
		await Reply.deleteMany({});
		await Thread.deleteMany({});
		await Tag.deleteMany({}); */

		const mockData = await User.findOne({name: "frank"});
		if (mockData) {
			return res.status(200).json({message: "Db was already filled with mock data"});
		}

		const frank = await User.create({name: "frank", email: "frank@test.com", firebaseId: "nsN9j7ln7rQk7VBTr0WRSe7vo8L2"});
		const jhon = await User.create({name: "jhon", email: "jhon@test.com", firebaseId: "nsN9j7ln72bd7VBTr0WRSe7vo8L2"});

		/* eslint-disable new-cap */
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
			{title: "This is the first title", body: "This is the first body", authorId: mongoose.Types.ObjectId(frank._id), tags: [mockTags[0]._id, mockTags[5]._id]},
			{title: "This is the second title", body: "This is the second body", authorId: mongoose.Types.ObjectId(frank._id)},
			{title: "This is the third title", body: "This is the third body", authorId: mongoose.Types.ObjectId(jhon._id)},
			{title: "This is the fourth title", body: "This is the fourth body", authorId: mongoose.Types.ObjectId(frank._id), tags: [mockTags[5]._id, mockTags[6]._id]}
		]);
		const replies = await Reply.create([
			{body: "This is the first reply to the first question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
			{body: "This is the first reply to the second question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[1]._id)},
			{body: "This is the first reply to the third question", authorId: mongoose.Types.ObjectId(frank._id), questionId: mongoose.Types.ObjectId(questions[2]._id)},
			{body: "This is the second reply to the first question", authorId: mongoose.Types.ObjectId(frank._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
			{body: "This is the third reply to the first question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
			{body: "This is the second reply to the third question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[2]._id)}
		]);
		/* eslint-enable new-cap */

		const threads = [];
		for (const question of questions) {
			threads.push({
				question: question._id,
				replies: replies.filter(reply => reply.questionId === question._id).map(el => el._id)
			});
		}

		await Thread.create(threads);
		console.log("questions", questions);

		return res.status(200).json({message: "Db Populated"});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
