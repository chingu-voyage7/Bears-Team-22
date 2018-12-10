const LocalStrategy = require("passport-local").Strategy;
const User = require("../users/user-model");

exports.localStrategy = new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
}, async (email, password, done) => {
	try {
		const user = await User.findOne({email}).exec();
		if (!user) {
			return done(null, false, {message: "Login failed"});
		}
		if (!user.isPasswordValid(password)) {
			return done(null, false, {message: "Login failed"});
		}
		return done(null, user);
	} catch (error) {
		return done(error);
	}
});
