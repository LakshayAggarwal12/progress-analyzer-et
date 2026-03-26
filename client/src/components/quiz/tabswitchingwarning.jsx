import React from 'react';

const TabSwitchingWarning = ({ count, max = 3 }) => {
  if (count === 0) return null;
  return (
    <div className={`rounded-lg px-4 py-3 mb-4 border ${count >= max - 1 ? 'bg-red-50 border-red-300 text-red-700' : 'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">⚠️</span>
        <div>
          <p className="font-medium text-sm">Tab switching detected!</p>
          <p className="text-xs mt-0.5">{count} / {max} warnings — quiz auto-submits at {max}</p>
        </div>
        <div className="ml-auto flex gap-1">
          {Array.from({ length: max }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < count ? 'bg-red-500' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabSwitchingWarning;
