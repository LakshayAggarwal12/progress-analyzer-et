const axios = require("axios");

exports.createQuiz = async (topic) => {
  return [
    {
      question: `What is ${topic}?`,
      options: ["Concept", "Language", "Framework", "Library"],
      answer: "Concept",
    },
    {
      question: `Why is ${topic} used?`,
      options: ["Speed", "Security", "UI", "All"],
      answer: "All",
    },
  ];
};