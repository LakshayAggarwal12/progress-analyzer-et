import React from 'react';

const RoadmapProgress = ({ topics }) => {
  const total = topics?.length || 0;
  const done = topics?.filter(t => t.completed).length || 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">Overall Progress</h3>
        <span className="text-sm font-bold text-indigo-600">{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-500 mt-2">{done} of {total} topics completed</p>
    </div>
  );
};

export default RoadmapProgress;
