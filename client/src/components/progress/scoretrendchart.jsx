import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ScoreTrendChart = ({ scoreTrend }) => (
  <div className="bg-white rounded-xl shadow-sm border p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Quiz Score Trend</h3>
    {(!scoreTrend || scoreTrend.length === 0) ? (
      <p className="text-gray-400 text-sm text-center py-8">Take quizzes to see your score trend!</p>
    ) : (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={scoreTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
          <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
          <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '70%', fontSize: 11 }} />
          <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default ScoreTrendChart;
