
exports.login = (req, res) => {
    if (!req.body) {
        return res.status(400).end();
    }
    req.firebaseServer.auth().verifyIdToken(req.body.token)
                        .then(decodedToken => {
                           req.session.decodedToken = decodedToken;
                           console.log('uid',req.session.decodedToken.uid)
                           res.status(200).json({message: 'Auth successful'});})
                        .catch( error => res.json({error}));
};

exports.logout = (req, res) => {
    req.session.decodedToken = null;
    res.status(204).end();
}