import React from 'react';
import PeerCard from './peercard';

const PeerList = ({ peers, onChat }) => (
  <div>
    {peers.length === 0 ? (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">👥</p>
        <p className="font-medium">No peers found</p>
        <p className="text-sm mt-1">No one else is learning the same skill yet.</p>
      </div>
    ) : (
      <div className="grid gap-3">
        {peers.map(peer => (
          <PeerCard key={peer._id} peer={peer} onChat={onChat} />
        ))}
      </div>
    )}
  </div>
);

export default PeerList;
