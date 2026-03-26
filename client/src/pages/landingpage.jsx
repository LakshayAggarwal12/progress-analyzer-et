import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
    <nav className="flex items-center justify-between px-8 py-5">
      <span className="text-white font-bold text-xl">📈 ProgressIQ</span>
      <div className="flex gap-3">
        <Link to="/login" className="text-white text-sm hover:text-indigo-200 px-4 py-2">Login</Link>
        <Link to="/register" className="bg-white text-indigo-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">Get Started</Link>
      </div>
    </nav>
    <div className="max-w-4xl mx-auto px-8 py-20 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
        Track Your Learning.<br />
        <span className="text-yellow-300">Level Up Faster.</span>
      </h1>
      <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
        AI-powered quizzes, smart progress tracking, personalised roadmaps and peer learning — all in one place.
      </p>
      <Link to="/register" className="inline-block bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-50 transition-colors shadow-lg">
        Start Learning Free →
      </Link>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon: '🤖', label: 'AI Quizzes' },
          { icon: '📊', label: 'Progress Charts' },
          { icon: '🗺️', label: 'Roadmaps' },
          { icon: '👥', label: 'Peer Chat' }
        ].map(f => (
          <div key={f.label} className="bg-white/10 backdrop-blur rounded-xl p-5">
            <div className="text-3xl mb-2">{f.icon}</div>
            <p className="text-white font-medium text-sm">{f.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LandingPage;
