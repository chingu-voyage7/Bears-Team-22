const User = require("../users/user-model");
const {localStrategy} = require("./passport-strategies");

module.exports = passport => {
	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id).exec();
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	});

	passport.use(localStrategy);
};
