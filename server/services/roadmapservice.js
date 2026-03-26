const { getGeminiModel } = require('../config/gemini');

const generateRoadmap = async (skill, level) => {
  try {
    const model = getGeminiModel();
    const prompt = `Create a learning roadmap for "${skill}" at ${level} level.
Return ONLY a JSON array of 8-12 topics in order from foundational to advanced:
[
  {
    "id": "topic_1",
    "title": "Topic Title",
    "description": "1-2 sentence description of what this topic covers",
    "order": 1
  }
]
Make it practical and progressive. Return ONLY the JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const topics = JSON.parse(jsonMatch[0]);
      return topics.map(t => ({ ...t, completed: false }));
    }
    throw new Error('Failed to parse roadmap');
  } catch (error) {
    console.error('Roadmap generation error:', error);
    // Fallback roadmap
    return [
      { id: 'topic_1', title: 'Fundamentals', description: 'Core concepts and basics', order: 1, completed: false },
      { id: 'topic_2', title: 'Core Concepts', description: 'Essential building blocks', order: 2, completed: false },
      { id: 'topic_3', title: 'Practical Application', description: 'Hands-on practice', order: 3, completed: false },
      { id: 'topic_4', title: 'Advanced Topics', description: 'Deeper understanding', order: 4, completed: false },
      { id: 'topic_5', title: 'Best Practices', description: 'Industry standards', order: 5, completed: false },
      { id: 'topic_6', title: 'Projects & Portfolio', description: 'Real-world projects', order: 6, completed: false }
    ];
  }
};

module.exports = { generateRoadmap };
