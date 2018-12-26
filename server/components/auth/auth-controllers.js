
exports.login = async (req, res) => {
	if (!req.body) {
		return res.status(400).end();
	}

	const expiresIn = 60 * 60 * 5 * 1000; // 5hrs

	try {
		const sessionCookie = await req.firebaseServer.auth().createSessionCookie(req.body.idToken, {expiresIn});

		// Set cookie policy for session cookie.
		// const options = {maxAge: expiresIn, httpOnly: true, secure: true};
		const options = {maxAge: expiresIn};
		res.cookie("session", sessionCookie, options);
		res.status(204).end();
	} catch (error) {
		res.status(401).send("UNAUTHORIZED REQUEST!");
	}
};

exports.logout = (req, res) => {
	req.session.decodedToken = null;

	// TODO: revoke refresh token
	/*     req.firebaseServer.auth().verifySessionCookie(req.session.cookie)
            .then((decodedClaims) => req.firebaseServer.auth().revokeRefreshTokens(decodedClaims.sub)); */

	// TODO: Log error somewhere
	req.session.destroy(err => {
		if (err) {
			console.error(err);
		}

		res.clearCookie("default-session-cookie");
		res.clearCookie("session");
		res.status(204).end();
	});
};

exports.sessionVerificationMw = (req, res, next) => {
	const sessionCookie = req.cookies.session || "";

	// TODO: check if session was revoked
	req.firebaseServer.auth().verifySessionCookie(sessionCookie, true)
		.then(next) // eslint-disable-line promise/prefer-await-to-then
		.catch(() => res.status(401).json({message: "Unauthorized"}));
};
