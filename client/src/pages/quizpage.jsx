import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/quiz/quizcard';
import QuizTimer from '../components/quiz/quiztimer';
import QuizResult from '../components/quiz/quizresult';
import TabSwitchingWarning from '../components/quiz/tabswitchingwarning';
import { useTabLock } from '../hooks/useTabLock';
import { quizAPI } from '../api/quizAPI';
import { AuthContext } from '../context/authcontext';

const MAX_WARNINGS = 3;

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [tabWarnings, setTabWarnings] = useState(0);
  const [startTime] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmitQuiz = useCallback(async (autoSubmit = false) => {
    if (!quizData || submitting) return;
    setSubmitting(true);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const answersArray = quizData.questions.map((_, i) => answers[i] || '');
    try {
      const response = await quizAPI.submit({
        topic: quizData.topic,
        questions: quizData.questions,
        answers: answersArray,
        timeTaken
      });
      setResult({
        score: response.data.result.score,
        totalQuestions: quizData.questions.length,
        percentage: response.data.result.percentage,
        timeTaken,
        autoSubmitted: autoSubmit
      });
      setQuizSubmitted(true);
      localStorage.removeItem('currentQuiz');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [quizData, answers, startTime, submitting]);

  const handleTabSwitch = useCallback(() => {
    setTabWarnings(prev => {
      const next = prev + 1;
      if (next >= MAX_WARNINGS) {
        setTimeout(() => handleSubmitQuiz(true), 500);
      }
      return next;
    });
  }, [handleSubmitQuiz]);

  const { isTabActive, switchCount } = useTabLock(handleTabSwitch);

  useEffect(() => {
    const storedQuiz = localStorage.getItem('currentQuiz');
    if (!storedQuiz) { navigate('/dashboard'); return; }
    setQuizData(JSON.parse(storedQuiz));
  }, [navigate]);

  const handleAnswerSelect = (qIndex, answer) => {
    setAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  if (!quizData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
  );

  if (quizSubmitted && result) return (
    <div className="min-h-screen bg-gray-100 py-12">
      <QuizResult result={result} onRetry={() => navigate('/dashboard')} />
    </div>
  );

  const answered = Object.keys(answers).length;
  const total = quizData.questions.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quizData.topic}</h1>
            <p className="text-sm text-gray-500 capitalize">Level: {quizData.level} · {answered}/{total} answered</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-sm text-gray-400 hover:text-gray-600">✕ Exit</button>
        </div>

        <QuizTimer duration={1200} onTimeUp={() => handleSubmitQuiz(true)} />
        <TabSwitchingWarning count={tabWarnings} max={MAX_WARNINGS} />

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(answered / total) * 100}%` }} />
        </div>

        {quizData.questions.map((question, index) => (
          <QuizCard
            key={index}
            question={question}
            index={index}
            selectedAnswer={answers[index]}
            onAnswerSelect={handleAnswerSelect}
            totalQuestions={total}
          />
        ))}

        <div className="mt-6 flex items-center justify-between pb-8">
          <p className="text-sm text-gray-500">{answered} of {total} questions answered</p>
          <button onClick={() => handleSubmitQuiz(false)} disabled={submitting}
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
            {submitting ? 'Submitting...' : 'Submit Quiz ✓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
