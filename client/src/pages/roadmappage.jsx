import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/navbar';
import Loader from '../components/common/loader';
import RoadmapFlow from '../components/roadmap/roadmapflow';
import RoadmapProgress from '../components/roadmap/roadmapprogress';
import { roadmapAPI } from '../api/roadmapAPI';
import { useAuth } from '../hooks/useauth';

const RoadmapPage = () => {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  const loadRoadmap = async () => {
    try {
      const res = await roadmapAPI.get();
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRoadmap(); }, []);

  const handleToggle = async (topicId, completed) => {
    try {
      const res = await roadmapAPI.updateTopic(topicId, completed);
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const res = await roadmapAPI.regenerate();
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🗺️ Learning Roadmap</h1>
            <p className="text-sm text-gray-500 mt-1">AI-generated path for <strong>{user?.skill}</strong></p>
          </div>
          <button onClick={handleRegenerate} disabled={regenerating}
            className="text-sm px-4 py-2 border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50 transition-colors">
            {regenerating ? 'Regenerating...' : '🔄 Regenerate'}
          </button>
        </div>
        {loading ? <Loader text="Generating your roadmap..." /> : (
          roadmap ? (
            <>
              <RoadmapProgress topics={roadmap.topics} />
              <p className="text-xs text-gray-400 mb-4">Click a topic to mark it complete</p>
              <RoadmapFlow topics={roadmap.topics} onToggle={handleToggle} />
            </>
          ) : (
            <p className="text-center text-gray-400 py-12">Failed to load roadmap. Please refresh.</p>
          )
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;
