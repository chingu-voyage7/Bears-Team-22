const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const {sessionVerificationMw} = require('../auth/auth-controllers');

// MOCK ROUTING FOR TESTING
router.get('/get-all', sessionVerificationMw, (req, res) => {
	console.log('route reached');
	res.status(200).json({message: 'protected route reached'});
});
module.exports = router;
