const express = require('express');
const router = express.Router();
const {
  getExams,
  getTests,
  getTestById,
  submitTestAttempt,
  aiTutorChat,
  evaluateInterviewTurn,
  getInterviewTracks,
  runCodingSandbox,
  analyzeResume,
  getAdminMetrics,
  addQuestionToBank,
  createExam
} = require('../controllers/prepAIController');
const auth = require('../middleware/auth');

// Public or Protected routes
router.get('/exams', getExams);
router.post('/exams', auth, createExam);

router.get('/tests', getTests);
router.get('/tests/:id', getTestById);
router.post('/tests/submit', auth, submitTestAttempt);

// AI & Learning Tools
router.post('/tutor/chat', auth, aiTutorChat);
router.get('/interview/tracks', getInterviewTracks);
router.post('/interview/evaluate', auth, evaluateInterviewTurn);
router.post('/coding/run', auth, runCodingSandbox);
router.post('/resume/analyze', auth, analyzeResume);

// Admin & Content Reviewer Tools
router.get('/admin/metrics', auth, getAdminMetrics);
router.post('/content/question', auth, addQuestionToBank);

module.exports = router;
