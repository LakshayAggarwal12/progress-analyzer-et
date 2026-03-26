const StudyLog = require('../models/studylog');
const QuizResult = require('../models/quizresult');
const { generateProgressInsight } = require('../services/progressservice');

// @desc    Get progress analytics
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get last 7 days logs
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const logs = await StudyLog.find({
      user: userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    const quizzes = await QuizResult.find({
      user: userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Hours per day
    const hoursByDay = {};
    logs.forEach(log => {
      const day = new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' });
      hoursByDay[day] = (hoursByDay[day] || 0) + log.hours;
    });

    // Topics studied this week
    const topicsSet = new Set(logs.map(l => l.topic));
    const weekTopics = [...topicsSet];

    // Quiz score trend
    const scoreTrend = quizzes.map(q => ({
      date: new Date(q.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round((q.score / q.totalQuestions) * 100),
      topic: q.topic
    }));

    // Streak
    const allLogs = await StudyLog.find({ user: userId }).sort({ date: -1 });
    let streak = 0;
    if (allLogs.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let checkDate = new Date(today);
      for (let i = 0; i < 365; i++) {
        const dayLogs = allLogs.filter(log => {
          const logDate = new Date(log.date);
          logDate.setHours(0, 0, 0, 0);
          return logDate.getTime() === checkDate.getTime();
        });
        if (dayLogs.length > 0) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    res.json({
      hoursByDay,
      weekTopics,
      scoreTrend,
      streak,
      totalHours: logs.reduce((sum, l) => sum + l.hours, 0),
      totalQuizzes: quizzes.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get AI insight on progress
// @route   GET /api/progress/insight
// @access  Private
const getAIInsight = async (req, res) => {
  try {
    const userId = req.user._id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const logs = await StudyLog.find({ user: userId, date: { $gte: sevenDaysAgo } });
    const quizzes = await QuizResult.find({ user: userId, date: { $gte: sevenDaysAgo } });

    const insight = await generateProgressInsight(req.user, logs, quizzes);
    res.json({ insight });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProgress, getAIInsight };
