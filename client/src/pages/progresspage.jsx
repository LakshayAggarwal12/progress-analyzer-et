import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/navbar';
import Loader from '../components/common/loader';
import HoursBarChart from '../components/progress/hoursbarchart';
import ScoreTrendChart from '../components/progress/scoretrendchart';
import WeekTopicsCard from '../components/progress/weektopicscard';
import AIInsightCard from '../components/progress/aiinsightcard';
import { progressAPI } from '../api/progressAPI';

const ProgressPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressAPI.get()
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">📊 Your Progress</h1>
        {loading ? <Loader text="Loading your progress..." /> : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Day Streak 🔥', value: data?.streak || 0 },
                { label: 'Hours This Week', value: `${(data?.totalHours || 0).toFixed(1)}h` },
                { label: 'Quizzes This Week', value: data?.totalQuizzes || 0 }
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border text-center">
                  <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <AIInsightCard />
            <div className="grid md:grid-cols-2 gap-6">
              <HoursBarChart hoursByDay={data?.hoursByDay} />
              <ScoreTrendChart scoreTrend={data?.scoreTrend} />
            </div>
            <WeekTopicsCard topics={data?.weekTopics} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
