const express = require('express');
const router = express.Router();
const { submitInterview, getDashboardStats, getHistory, getLeaderboard } = require('../controllers/resultController');
const auth = require('../middleware/auth');

// @route   POST api/results
// @desc    Submit an interview result
router.post('/', auth, submitInterview);

// @route   GET api/results/dashboard
// @desc    Get logged in user's dashboard stats
router.get('/dashboard', auth, getDashboardStats);

// @route   GET api/results/history
// @desc    Get all past interview results for the user
router.get('/history', auth, getHistory);

// @route   GET api/results/leaderboard
// @desc    Get leaderboard stats
router.get('/leaderboard', auth, getLeaderboard);

module.exports = router;
