const express = require('express');

const {getQuestion, prepopulate} = require('./search-controller');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/search', getQuestion);
router.get('/pre-populate', prepopulate);

module.exports = router;
