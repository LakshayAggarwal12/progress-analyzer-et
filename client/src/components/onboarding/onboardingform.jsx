import React, { useState } from 'react';
import { useAuth } from '../../hooks/useauth';
import { useNavigate } from 'react-router-dom';

const SKILLS = ['JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'Machine Learning', 'UI/UX Design', 'DevOps', 'Other'];

const OnboardingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: `Welcome, ${user?.name?.split(' ')[0]}! 🎉`,
      desc: "Let's get you set up for success.",
      content: (
        <div className="text-center space-y-4 py-4">
          <div className="text-6xl">🚀</div>
          <p className="text-gray-600">You're learning <strong>{user?.skill}</strong> at <strong>{user?.level}</strong> level.</p>
          <p className="text-sm text-gray-500">ProgressIQ will track your study sessions, generate quizzes, and build a personalised roadmap for you.</p>
        </div>
      )
    },
    {
      title: 'How it works',
      desc: 'Here is what you can do:',
      content: (
        <div className="space-y-3 py-2">
          {[
            { icon: '📝', title: 'Take AI Quizzes', desc: 'Generate quizzes on any topic using Gemini AI' },
            { icon: '📊', title: 'Track Progress', desc: 'Log study hours and see your improvement over time' },
            { icon: '🗺️', title: 'Follow Your Roadmap', desc: 'AI-generated learning path for your skill' },
            { icon: '👥', title: 'Connect with Peers', desc: 'Chat with others learning the same skill' }
          ].map(item => (
            <div key={item.title} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="font-medium text-sm text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "You're all set! ✅",
      desc: "Time to start your learning journey.",
      content: (
        <div className="text-center space-y-4 py-4">
          <div className="text-6xl">🎯</div>
          <p className="text-gray-600">Your personalised roadmap for <strong>{user?.skill}</strong> is ready.</p>
          <p className="text-sm text-gray-500">Log your first study session or take a quiz to get started.</p>
        </div>
      )
    }
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex gap-1 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'bg-indigo-500' : 'bg-gray-200'}`} />
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">{current.title}</h2>
        <p className="text-sm text-gray-500 mb-4">{current.desc}</p>
        {current.content}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
          ) : <div />}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Next →</button>
          ) : (
            <button onClick={() => navigate('/dashboard')} className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Go to Dashboard 🚀</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
