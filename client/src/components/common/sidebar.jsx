import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/progress', label: 'Progress', icon: '📊' },
    { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { to: '/peers', label: 'Peers', icon: '👥' }
  ];

  return (
    <aside className="w-56 min-h-screen bg-white border-r flex flex-col py-6 px-3 gap-2">
      {links.map(l => (
        <Link key={l.to} to={l.to}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
          <span>{l.icon}</span>{l.label}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
