const express = require('express');

const {login, logout} = require('./auth-controllers');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
