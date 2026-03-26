import React from 'react';
import { levelBadge } from '../../utils/levelmapper';

const PeerCard = ({ peer, onChat }) => (
  <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
        {peer.name?.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-medium text-gray-900 text-sm">{peer.name}</p>
        <p className="text-xs text-gray-500">{peer.skill}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block ${levelBadge(peer.level)}`}>
          {peer.level}
        </span>
      </div>
    </div>
    <button onClick={() => onChat(peer._id)}
      className="text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
      Chat
    </button>
  </div>
);

export default PeerCard;
