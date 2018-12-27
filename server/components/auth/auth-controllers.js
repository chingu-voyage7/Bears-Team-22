const User = require('../users/user-model');

exports.login = async (req, res) => {
	// No body, no token, no party!
	if (!req.body) {
		return res.status(400).end();
	}

	// Collect info registered into firebase account
	const firebaseUserInfo = await req.firebaseServer.auth().verifyIdToken(req.body.idToken);

	let loggedUser = {};

	// Info from the registration form
	if (req.body.registrationData) {
		// Handle registration + login | Save new user into our MongoDb
		try {
			loggedUser = await new User({
				_id: firebaseUserInfo.uid,
				name: req.body.registrationData.name,
				email: req.body.registrationData.email
			}).save();
		} catch (error) {
			return res.status(500).json({error});
		}
	} else {
		// Handle login | Fetch user from mongoDb using the firebase id
		try {
			loggedUser = await User.findById(firebaseUserInfo.uid);
		} catch (error) {
			return res.status(500).json({error});
		}
	}

	const expiresIn = 60 * 60 * 5 * 1000; // 5hrs
	req.firebaseServer.auth().createSessionCookie(req.body.idToken, {expiresIn}).then(sessionCookie => {
		// Set cookie policy for session cookie. To be safe it must be implemented on https
		// const options = {maxAge: expiresIn, httpOnly: true, secure: true};
		const options = {maxAge: expiresIn};
		res.cookie('session', sessionCookie, options);
		res.status(200).json({loggedUser});
	})
		.catch(() => res.status(401).send('UNAUTHORIZED REQUEST!')); // Invalid token
};

exports.logout = (req, res) => {
	res.clearCookie('session');
	res.status(204).end();
};

exports.sessionVerificationMw = (req, res, next) => {
	// Thanks to cookieParser the cookie named 'session' is accessible
	if (req.cookies.session) {
		req.firebaseServer.auth().verifySessionCookie(req.cookies.session, true)
			.then(userInfo => {
				// Once the cookie is verified the user info are available and set to a custom property on the req object
				req.knowledgeUserInfo = userInfo;
				next();
			})
			.catch(() => res.status(401).json({message: 'Unauthorized'})); // Verification cookie failed
	} else {
		res.status(401).json({message: 'Unauthorized'}); // No cookie named session provided
	}
};
