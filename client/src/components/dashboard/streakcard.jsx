import React from 'react';

const StreakCard = ({ streak, totalHours, totalQuizzes }) => (
  <div className="grid grid-cols-3 gap-4">
    {[
      { label: 'Day Streak', value: streak, icon: '🔥', color: 'text-orange-500' },
      { label: 'Hours This Week', value: `${(totalHours || 0).toFixed(1)}h`, icon: '⏱️', color: 'text-blue-500' },
      { label: 'Quizzes Taken', value: totalQuizzes || 0, icon: '📝', color: 'text-green-500' }
    ].map(item => (
      <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm border text-center">
        <div className={`text-2xl ${item.color} font-bold`}>{item.value}</div>
        <div className="text-xs text-gray-500 mt-1">{item.label}</div>
      </div>
    ))}
  </div>
);

export default StreakCard;
