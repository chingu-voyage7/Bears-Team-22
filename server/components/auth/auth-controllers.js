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
				firebaseId: firebaseUserInfo.uid,
				name: req.body.registrationData.name,
				email: req.body.registrationData.email
			}).save();
			delete loggedUser.__v;
			delete loggedUser.firebase_id;
		} catch (error) {
			return res.status(500).json({error});
		}
	} else {
		// Handle login | Fetch user from mongoDb using the firebase id
		try {
			loggedUser = await User.findOne({firebaseId: firebaseUserInfo.uid}).select('-__v');
		} catch (error) {
			return res.status(500).json({error});
		}
	}

	try {
		const expiresIn = 60 * 60 * 5 * 1000; // 5hrs
		const sessionCookie = await req.firebaseServer.auth().createSessionCookie(req.body.idToken, {expiresIn});
		// Set cookie policy for session cookie. To be safe it must be implemented on https
		// const options = {maxAge: expiresIn, httpOnly: true, secure: true};
		const options = {maxAge: expiresIn};
		res.cookie('session', sessionCookie, options);
		res.status(200).json({loggedUser});
	} catch (error) {
		res.status(401).send('UNAUTHORIZED REQUEST!'); // Invalid token
	}
};

exports.logout = (req, res) => {
	res.clearCookie('session');
	res.status(204).end();
};

exports.sessionVerificationMw = async (req, res, next) => {
	// Thanks to cookieParser the cookie named 'session' is accessible
	if (req.cookies.session) {
		try {
			console.log(req.cookies.session);
			const userInfo = await req.firebaseServer.auth().verifySessionCookie(req.cookies.session, true);
			// Once the cookie is verified the user info are available and set to a custom property on the req object
			req.knowledgeUserInfo = userInfo;
			// Due to the incompatibility between the
			// firebase uid and the mongoId is needed an
			// additional call:
			req.knowledgeUserInfo.mongoInstance = await User.findOne({firebaseId: userInfo.uid});
			if(!req.knowledgeUserInfo.mongoInstance) throw new Error();
			next();
		} catch (error) {
			res.status(401).json({message: 'Unauthorized'}); // Verification cookie failed
		}
	} else {
		res.status(401).json({message: 'Unauthorized'}); // No cookie named session provided
	}
};
