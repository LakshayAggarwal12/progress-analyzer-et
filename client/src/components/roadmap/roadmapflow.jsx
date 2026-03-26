import React from 'react';
import TopicNode from './topicnode';

const RoadmapFlow = ({ topics, onToggle }) => (
  <div className="relative">
    <div className="space-y-3">
      {topics.map((topic, i) => (
        <div key={topic.id} className="relative">
          {i < topics.length - 1 && (
            <div className={`absolute left-7 top-full w-0.5 h-3 z-10
              ${topic.completed ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
          <TopicNode topic={topic} index={i} onToggle={onToggle} />
        </div>
      ))}
    </div>
  </div>
);

export default RoadmapFlow;
