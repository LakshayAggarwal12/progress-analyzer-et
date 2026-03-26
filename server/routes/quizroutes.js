const express = require('express');
const { 
  generateQuizQuestions, 
  submitQuiz, 
  getQuizHistory 
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', protect, generateQuizQuestions);
router.post('/submit', protect, submitQuiz);
router.get('/history', protect, getQuizHistory);

module.exports = router;