const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('User', userSchema);
