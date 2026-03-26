const QuizResult = require('../models/QuizResult');
const { generateQuiz } = require('../services/geminiService');

// @desc    Generate quiz questions
// @route   POST /api/quiz/generate
// @access  Private
const generateQuizQuestions = async (req, res) => {
  try {
    const { topic, level, numQuestions = 5 } = req.body;
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }
    
    const quizData = await generateQuiz(topic, level || 'beginner', numQuestions);
    
    res.json({
      topic,
      level: level || 'beginner',
      questions: quizData.questions,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate quiz', 
      error: error.message 
    });
  }
};

// @desc    Submit quiz and save results
// @route   POST /api/quiz/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { topic, questions, answers, timeTaken } = req.body;
    
    if (!topic || !questions || !answers) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Calculate score
    let score = 0;
    const formattedQuestions = questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score++;
      
      return {
        question: q.question,
        userAnswer: userAnswer || 'Not answered',
        correctAnswer: q.correctAnswer,
        isCorrect,
        options: q.options
      };
    });
    
    // Save quiz result
    const quizResult = await QuizResult.create({
      user: req.user._id,
      topic,
      questions: formattedQuestions,
      score,
      totalQuestions: questions.length,
      timeTaken: timeTaken || 0
    });
    
    res.json({
      message: 'Quiz submitted successfully',
      result: {
        score,
        totalQuestions: questions.length,
        percentage: (score / questions.length) * 100,
        timeTaken,
        quizId: quizResult._id
      }
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit quiz', 
      error: error.message 
    });
  }
};

// @desc    Get user's quiz history
// @route   GET /api/quiz/history
// @access  Private
const getQuizHistory = async (req, res) => {
  try {
    const quizzes = await QuizResult.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(10);
    
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ message: 'Failed to fetch quiz history' });
  }
};

module.exports = { generateQuizQuestions, submitQuiz, getQuizHistory };