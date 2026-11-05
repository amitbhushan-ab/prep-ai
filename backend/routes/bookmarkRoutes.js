const express = require('express');
const router = express.Router();
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

router.post('/toggle', auth, toggleBookmark);
router.get('/', auth, getBookmarks);

module.exports = router;
