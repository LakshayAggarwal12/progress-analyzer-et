import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResult = ({ result, onRetry }) => {
  const navigate = useNavigate();
  const percentage = result.percentage || (result.score / result.totalQuestions) * 100;

  const getGradeColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeMessage = () => {
    if (percentage >= 80) return 'Excellent! Great job! 🎉';
    if (percentage >= 60) return 'Good effort! Keep practicing! 👍';
    return 'Keep learning! Try again to improve! 💪';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
        
        <div className="mb-6">
          <div className={`text-5xl font-bold ${getGradeColor()} mb-2`}>
            {percentage.toFixed(1)}%
          </div>
          <p className="text-gray-600">
            Score: {result.score} out of {result.totalQuestions}
          </p>
          {result.timeTaken && (
            <p className="text-gray-600 mt-1">
              Time taken: {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
            </p>
          )}
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-700">{getGradeMessage()}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;