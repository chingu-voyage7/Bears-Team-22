const mongoose = require("mongoose");

// Setting few options to remove warning on feature deprecations
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("User", userSchema);
