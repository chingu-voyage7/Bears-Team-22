const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', function(next) {	
	bcrypt.hash(this.passwordHash, 10)
			.then(hash => { 
				this.passwordHash = hash;	
				next();
			})
			.catch(err => next(err))
});

userSchema.methods.isPasswordValid = function(insertedPassword) {
			return bcrypt.compareSync(insertedPassword,this.passwordHash);

}


module.exports = mongoose.model("User", userSchema);
