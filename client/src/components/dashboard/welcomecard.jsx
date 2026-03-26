import React from 'react';
import { levelBadge } from '../../utils/levelmapper';

const WelcomeCard = ({ user, streak }) => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-indigo-100">Learning <span className="font-semibold">{user?.skill}</span></p>
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full bg-white/20 capitalize`}>{user?.level}</span>
      </div>
      <div className="text-center bg-white/20 rounded-xl p-3">
        <div className="text-3xl font-bold">{streak}</div>
        <div className="text-xs text-indigo-100">day streak 🔥</div>
      </div>
    </div>
  </div>
);

export default WelcomeCard;
