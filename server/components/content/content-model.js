const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	replyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Content",
		default: null
	}
}, {timestamps: true, discriminatorKey: "type", collection: "posts"});

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tag"
	}]
});

const replySchema = new mongoose.Schema({
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Content"
	}
});

contentSchema.index({title: "text"});

const Content = mongoose.model("Content", contentSchema);

exports.Question = Content.discriminator("Question", questionSchema);
exports.Reply = Content.discriminator("Reply", replySchema);
