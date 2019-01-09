const {Question} = require("../content/content-model");

exports.getQuestion = async (req, res) => {
	// Const {page} = req.query;
	const query = req.query.q;

	// Split query into words then each word is wrapped in
	// double quotes to allow mongo to recognize those as
	// multiple phrases hence make a AND research instead of
	// OR research (passing the query 'foo bar' will now return
	// the text with 'foo' AND 'bar' instead of 'foo' OR 'bar').
	const qArr = query.split(" ");
	let qString = "";

	for (const word of qArr) {
		qString += `"${word}" `;
	}

	try {
		const result = await Question.find({$text: {$search: qString}});
		res.status(200).json({result});
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.populate = async (req, res, next) => {
	try {
		await Question.create([
			{title: "This is the first title", body: "This is the first body", authorId: "5c07a5a54a9d0c0012cd8b35"},
			{title: "This is the second title", body: "This is the second body", authorId: "5c07a5a54a9d0c0012cd8b35"},
			{title: "This is the third title", body: "This is the third body", authorId: "5c07a5a54a9d0c0012cd8b35"},
			{title: "This is the fourth title", body: "This is the fourth body", authorId: "5c07a5a54a9d0c0012cd8b35"}
		]);
		/*  - Just write down the documents you want to insert
        await xxxx.create([
            {...},
            ...
        ]);
        */
		res.status(200).json({message: "Db Populated"});
		next();
	} catch (error) {
		res.status(500).json(error);
		next();
	}
};
