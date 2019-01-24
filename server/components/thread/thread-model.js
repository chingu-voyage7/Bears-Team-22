const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
	question: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Content"
	},
	replies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Content"
	}]
});

const populateFields = function (next) {
	this.populate([
		{
			path: "question",
			populate: [
				{
					path: "authorId",
					select: "-__v -firebaseId"
				},
				{
					path: "tags",
					select: "-__v"
				}
			],
			select: "-__v"
		},
		{
			path: "replies",
			populate: [
				{
					path: "authorId",
					select: "-__v -firebaseId"
				}
			],
			select: "-__v"
		}
	]);
	next();
};

threadSchema
	.pre("findOne", populateFields)
	.pre("find", populateFields);

module.exports = mongoose.model("Thread", threadSchema);
