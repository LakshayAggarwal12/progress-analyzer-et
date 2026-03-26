import React from 'react';

const WeekTopicsCard = ({ topics }) => (
  <div className="bg-white rounded-xl shadow-sm border p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Topics This Week</h3>
    {!topics || topics.length === 0 ? (
      <p className="text-gray-400 text-sm">No topics studied yet this week.</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {topics.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-100">
            {t}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default WeekTopicsCard;
