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
			default: false
		},
		tags: 
			[{type:mongoose.Schema.Types.ObjectId,
			ref: "Tag"}]
		,
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{timestamps: true}
);

postSchema.post('save', function(newPost, next) {
	newPost.populate('tags').execPopulate().then(() => next());
})

module.exports = mongoose.model("Post", postSchema);
