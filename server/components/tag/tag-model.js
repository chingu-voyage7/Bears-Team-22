const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

tagSchema.index({name: "text"});

module.exports = mongoose.model("Tag", tagSchema);
