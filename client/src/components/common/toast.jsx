import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg text-white shadow-lg ${colors[type]} animate-fade-in`}>
      {message}
    </div>
  );
};

export default Toast;
