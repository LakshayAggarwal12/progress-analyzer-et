const { getGeminiModel } = require('../config/gemini');

const generateQuiz = async (topic, level, numQuestions = 5) => {
  try {
    const model = getGeminiModel();
    
    const prompt = `Generate a ${level} level quiz about "${topic}" with ${numQuestions} multiple choice questions. 
    Format the response as a JSON object with the following structure:
    {
      "questions": [
        {
          "question": "question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": "correct option text",
          "explanation": "brief explanation"
        }
      ]
    }
    Make sure the questions are appropriate for ${level} level learners. Return ONLY the JSON object.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse quiz JSON');
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

module.exports = { generateQuiz };