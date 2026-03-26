import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useauth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/progress', label: 'Progress' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/peers', label: 'Peers' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-xl font-bold text-indigo-600">📈 ProgressIQ</Link>
            <div className="hidden sm:flex gap-4">
              {links.map(l => (
                <Link key={l.to} to={l.to}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors ${location.pathname === l.to ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 hidden sm:block">{user?.name}</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize">{user?.level}</span>
            <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 transition-colors">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
