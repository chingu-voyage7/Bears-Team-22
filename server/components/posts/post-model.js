const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		isQuestion: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			required: function(){return this.isQuestion}
		},
		body: {
			type: String,
			required: true
		},
		tags:
			[{type: mongoose.Schema.Types.ObjectId,
				ref: "Tag"}],
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		replyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default: null
		}
	},
	{timestamps: true}
);

postSchema.post("save", async (newPost, next) => {
	await newPost.populate("tags").execPopulate();
	next();
});

module.exports = mongoose.model("Post", postSchema);
