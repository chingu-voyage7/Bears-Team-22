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

module.exports = mongoose.model("Thread", threadSchema);
