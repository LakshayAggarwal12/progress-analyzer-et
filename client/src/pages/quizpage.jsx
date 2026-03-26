import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/quiz/QuizCard';
import QuizTimer from '../components/quiz/QuizTimer';
import QuizResult from '../components/quiz/QuizResult';
import { useTabLock } from '../hooks/useTabLock';
import { quizAPI } from '../api/quizAPI';
import { AuthContext } from '../context/AuthContext';

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleTabSwitch = () => {
    setTabSwitchWarnings(prev => prev + 1);
    alert(`Warning: Tab switching detected! (${tabSwitchWarnings + 1}/3)`);
    
    if (tabSwitchWarnings + 1 >= 3) {
      alert('You have switched tabs 3 times. Quiz will be auto-submitted.');
      handleSubmitQuiz();
    }
  };

  const { isTabActive, switchCount } = useTabLock(handleTabSwitch);

  useEffect(() => {
    // Load quiz data from localStorage
    const storedQuiz = localStorage.getItem('currentQuiz');
    if (!storedQuiz) {
      navigate('/dashboard');
      return;
    }
    setQuizData(JSON.parse(storedQuiz));
  }, [navigate]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return;

    // Prepare answers array in order
    const answersArray = quizData.questions.map((_, index) => answers[index] || '');
    
    try {
      const response = await quizAPI.submit({
        topic: quizData.topic,
        questions: quizData.questions,
        answers: answersArray,
        timeTaken: 0 // We'll calculate this from timer
      });

      setResult({
        score: response.data.result.score,
        totalQuestions: quizData.questions.length,
        percentage: response.data.result.percentage,
        timeTaken: response.data.result.timeTaken
      });
      setQuizSubmitted(true);
      localStorage.removeItem('currentQuiz');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const handleTimeUp = () => {
    alert('Time is up! Submitting your quiz...');
    handleSubmitQuiz();
  };

  const handleRetry = () => {
    navigate('/dashboard');
  };

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading quiz...</div>
      </div>
    );
  }

  if (quizSubmitted && result) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <QuizResult result={result} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quiz: {quizData.topic}</h1>
          <p className="text-gray-600">Level: {quizData.level}</p>
        </div>

        <QuizTimer duration={1200} onTimeUp={handleTimeUp} />
        
        {tabSwitchWarnings > 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
            ⚠️ Tab switching detected: {tabSwitchWarnings}/3 warnings
          </div>
        )}

        {quizData.questions.map((question, index) => (
          <QuizCard
            key={index}
            question={question}
            index={index}
            selectedAnswer={answers[index]}
            onAnswerSelect={handleAnswerSelect}
            totalQuestions={quizData.questions.length}
          />
        ))}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmitQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;