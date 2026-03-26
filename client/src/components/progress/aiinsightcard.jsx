import React, { useState } from 'react';
import { progressAPI } from '../../api/progressAPI';

const AIInsightCard = () => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    try {
      const res = await progressAPI.getInsight();
      setInsight(res.data.insight);
    } catch (err) {
      setInsight('Unable to generate insight. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl shadow-sm border border-indigo-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">🤖 AI Learning Insight</h3>
        <button onClick={fetchInsight} disabled={loading}
          className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {loading ? 'Generating...' : 'Get Insight'}
        </button>
      </div>
      {insight ? (
        <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
      ) : (
        <p className="text-sm text-gray-400 italic">Click "Get Insight" for personalized feedback on your progress.</p>
      )}
    </div>
  );
};

export default AIInsightCard;
