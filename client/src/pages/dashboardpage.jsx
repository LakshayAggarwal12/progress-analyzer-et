import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../api/quizAPI';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic to study');
      return;
    }

    setLoading(true);
    try {
      const response = await quizAPI.generate({
        topic: topic,
        level: user.level,
        numQuestions: 5
      });
      
      // Store quiz data and navigate to quiz page
      localStorage.setItem('currentQuiz', JSON.stringify(response.data));
      navigate('/quiz');
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Progress Analyser</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Learning</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What topic do you want to study today?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={`e.g., React Hooks, JavaScript Arrays, etc. (Your skill: ${user?.skill})`}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleStartQuiz}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating Quiz...' : 'Start Quiz'}
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Learning Goal</h4>
              <p className="text-gray-900">{user?.skill}</p>
              <p className="text-sm text-gray-500 mt-1">Level: {user?.level}</p>
              <p className="text-sm text-gray-500">Check-in: {user?.checkInFreq}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Quick Stats</h4>
              <p className="text-gray-900">Complete quizzes to track your progress!</p>
              <p className="text-sm text-gray-500 mt-1">Take quizzes to earn scores and improve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;