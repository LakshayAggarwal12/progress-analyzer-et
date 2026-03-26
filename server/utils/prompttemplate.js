const buildQuizPrompt = (topic, level, numQuestions) =>
  `Generate a ${level} level quiz about "${topic}" with ${numQuestions} multiple choice questions.
Format as JSON: { "questions": [{ "question": "...", "options": ["..."], "correctAnswer": "...", "explanation": "..." }] }
Return ONLY the JSON.`;

const buildInsightPrompt = (user, stats) =>
  `Learning coach for ${user.skill} student. Stats: ${JSON.stringify(stats)}. Give brief encouragement and tip.`;

module.exports = { buildQuizPrompt, buildInsightPrompt };
