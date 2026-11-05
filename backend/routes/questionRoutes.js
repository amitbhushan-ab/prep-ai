const express = require('express');
const router = express.Router();
const { getQuestionsByCategory, getCategories, generateQuestions } = require('../controllers/questionController');
const auth = require('../middleware/auth');

// @route   GET api/questions/categories
// @desc    Get all categories
router.get('/categories', auth, getCategories);

// @route   GET api/questions/generate
// @desc    Generate questions for specific modes
router.get('/generate', auth, generateQuestions);

// @route   GET api/questions/:category
// @desc    Get questions by category
router.get('/:category', auth, getQuestionsByCategory);

module.exports = router;
