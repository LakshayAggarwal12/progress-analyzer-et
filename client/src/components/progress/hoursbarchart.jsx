import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HoursBarChart = ({ hoursByDay }) => {
  const data = Object.entries(hoursByDay || {}).map(([day, hours]) => ({ day, hours: +hours.toFixed(1) }));

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Study Hours This Week</h3>
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No data yet. Start logging sessions!</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`${v}h`, 'Hours']} />
            <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HoursBarChart;
