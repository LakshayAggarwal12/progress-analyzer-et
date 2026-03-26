import React from 'react';

const TopicNode = ({ topic, index, onToggle }) => (
  <div className={`flex gap-4 items-start p-4 rounded-xl border transition-all cursor-pointer
    ${topic.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-indigo-300'}`}
    onClick={() => onToggle(topic.id, !topic.completed)}>
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
      ${topic.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
      {topic.completed ? '✓' : index + 1}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-medium text-sm ${topic.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
        {topic.title}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
    </div>
    <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 transition-all
      ${topic.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`} />
  </div>
);

export default TopicNode;
