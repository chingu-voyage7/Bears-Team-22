const mongoose = require("mongoose");

// Setting few options to remove warning on feature deprecations
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

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
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);
