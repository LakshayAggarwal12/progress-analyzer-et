import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../api/quizAPI';
import { logAPI } from '../api/logAPI';
import { progressAPI } from '../api/progressAPI';
import Navbar from '../components/common/navbar';
import WelcomeCard from '../components/dashboard/welcomecard';
import StreakCard from '../components/dashboard/streakcard';
import StudyLogForm from '../components/dashboard/studylogform';
import RecentActivity from '../components/dashboard/recentactivity';
import Loader from '../components/common/loader';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [numQ, setNumQ] = useState(5);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const loadData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        logAPI.getAll(),
        progressAPI.get()
      ]);
      setLogs(logsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStartQuiz = async () => {
    if (!topic.trim()) { alert('Please enter a topic'); return; }
    setLoading(true);
    try {
      const response = await quizAPI.generate({ topic, level: user.level, numQuestions: numQ });
      localStorage.setItem('currentQuiz', JSON.stringify(response.data));
      navigate('/quiz');
    } catch (error) {
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await logAPI.delete(id);
      setLogs(logs.filter(l => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <WelcomeCard user={user} streak={stats?.streak || 0} />
        <StreakCard streak={stats?.streak || 0} totalHours={stats?.totalHours} totalQuizzes={stats?.totalQuizzes} />

        {/* Quiz Generator */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 Generate AI Quiz</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text" value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStartQuiz()}
              placeholder={`e.g., React Hooks, Arrays, ${user?.skill}...`}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <select value={numQ} onChange={e => setNumQ(+e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              {[3, 5, 7, 10].map(n => <option key={n} value={n}>{n} questions</option>)}
            </select>
            <button onClick={handleStartQuiz} disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm whitespace-nowrap">
              {loading ? 'Generating...' : 'Start Quiz ✨'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Level: <span className="capitalize font-medium text-gray-600">{user?.level}</span></p>
        </div>

        {/* Logs & Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <StudyLogForm onLogAdded={loadData} />
          {dataLoading ? <Loader /> : (
            <RecentActivity logs={logs} onDelete={handleDeleteLog} />
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: '📊 View Progress', to: '/progress', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
            { label: '🗺️ My Roadmap', to: '/roadmap', color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' },
            { label: '👥 Find Peers', to: '/peers', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
          ].map(item => (
            <button key={item.to} onClick={() => navigate(item.to)}
              className={`p-4 rounded-xl border font-medium text-sm transition-colors ${item.color}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
