import React, { useState, useEffect, useRef } from 'react';
import { peerAPI } from '../../api/peerAPI';
import { useAuth } from '../../hooks/useauth';
import { useSocket } from '../../hooks/usesocket';

const ChatWindow = ({ peerId, peerName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const socket = useSocket();
  const bottomRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await peerAPI.getChat(peerId);
        setMessages(res.data.messages || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();

    if (socket) {
      socket.emit('join_chat', peerId);
      socket.on('receive_message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
    }
    return () => { if (socket) socket.off('receive_message'); };
  }, [peerId, socket]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await peerAPI.sendMessage(peerId, text);
      if (!socket) {
        setMessages(prev => [...prev, { sender: user._id, text, timestamp: new Date() }]);
      }
      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border flex flex-col h-96">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-indigo-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
            {peerName?.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-900 text-sm">{peerName}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <p className="text-center text-gray-400 text-sm pt-8">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400 text-sm pt-8">No messages yet. Say hello! 👋</p>
        ) : messages.map((msg, i) => {
          const isMe = msg.sender === user._id || msg.sender?._id === user._id;
          return (
            <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t">
        <input value={text} onChange={e => setText(e.target.value)}
          placeholder="Type a message..." className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition-colors">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
