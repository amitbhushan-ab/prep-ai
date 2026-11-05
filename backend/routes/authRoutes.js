const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, getAllUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get user data
router.get('/me', auth, getMe);

// @route   PUT api/auth/profile
// @desc    Update user profile & preferences / role
router.put('/profile', auth, updateProfile);

// @route   GET api/auth/users
// @desc    Get all users for Admin
router.get('/users', auth, getAllUsers);

module.exports = router;
