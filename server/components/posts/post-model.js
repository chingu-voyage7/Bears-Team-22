const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		isQuestion: {
			type: Boolean,
			default: true,
			required: true
		},
		tags: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag"
		}],
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		replyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	},
	{timestamps: true}
);

postSchema.post("save", async (newPost, next) => {
	await newPost.populate("tags").execPopulate();
	next();
});

module.exports = mongoose.model("Post", postSchema);
