const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	}
});

userSchema.pre("save", next => {
	try {
		const hash = bcrypt.hash(this.passwordHash, 10);
		this.passwordHash = hash;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.validatePassword = value => {
	return bcrypt.compareSync(value, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
