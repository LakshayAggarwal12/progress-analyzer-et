const express = require('express');
const { 
  generateQuizQuestions, 
  submitQuiz, 
  getQuizHistory 
} = require('../controllers/quizcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/generate', protect, generateQuizQuestions);
router.post('/submit', protect, submitQuiz);
router.get('/history', protect, getQuizHistory);

module.exports = router;