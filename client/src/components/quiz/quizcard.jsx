import React from 'react';

const QuizCard = ({ question, index, selectedAnswer, onAnswerSelect, totalQuestions }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <div className="mb-4">
        <span className="text-sm text-gray-500">Question {index + 1} of {totalQuestions}</span>
        <h3 className="text-lg font-semibold text-gray-900 mt-1">{question.question}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, optIndex) => (
          <label
            key={optIndex}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
              selectedAnswer === option
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(index, option)}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;