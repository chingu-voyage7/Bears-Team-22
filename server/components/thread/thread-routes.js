const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const {getThread} = require('./thread-controller');

router.get('/:questionId', getThread);

module.exports = router;
