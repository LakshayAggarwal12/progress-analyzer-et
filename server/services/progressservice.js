const { getGeminiModel } = require('../config/gemini');

const generateProgressInsight = async (user, logs, quizzes) => {
  try {
    const model = getGeminiModel();
    const totalHours = logs.reduce((sum, l) => sum + l.hours, 0);
    const avgScore = quizzes.length > 0
      ? Math.round(quizzes.reduce((sum, q) => sum + (q.score / q.totalQuestions) * 100, 0) / quizzes.length)
      : null;
    const topics = [...new Set(logs.map(l => l.topic))];

    const prompt = `You are a learning coach. A student learning "${user.skill}" at ${user.level} level has this week's data:
- Study hours: ${totalHours.toFixed(1)}h
- Topics covered: ${topics.join(', ') || 'none'}
- Quiz average score: ${avgScore !== null ? avgScore + '%' : 'no quizzes taken'}
- Number of quizzes: ${quizzes.length}

Give a brief, encouraging 2-3 sentence personalized insight about their progress and one actionable suggestion. Be specific to their skill and data.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Progress insight error:', error);
    return "Keep up the great work! Consistent study sessions lead to mastery. Try challenging yourself with a quiz on a topic you studied this week.";
  }
};

module.exports = { generateProgressInsight };
