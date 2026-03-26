import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/navbar';
import Loader from '../components/common/loader';
import PeerList from '../components/peers/peerlist';
import ChatWindow from '../components/peers/chatwindow';
import { peerAPI } from '../api/peerAPI';

const PeersPage = () => {
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    peerAPI.getPeers()
      .then(res => setPeers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openChat = (peerId) => {
    const peer = peers.find(p => p._id === peerId);
    setActiveChat(peer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">👥 Peer Learners</h1>
        <p className="text-sm text-gray-500 mb-6">Connect with others learning the same skill as you</p>
        {loading ? <Loader text="Finding peers..." /> : (
          <PeerList peers={peers} onChat={openChat} />
        )}
        {activeChat && (
          <div className="fixed bottom-4 right-4 w-80 z-50">
            <ChatWindow
              peerId={activeChat._id}
              peerName={activeChat.name}
              onClose={() => setActiveChat(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PeersPage;
