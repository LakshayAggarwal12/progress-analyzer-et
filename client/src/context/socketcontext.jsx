import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children, token }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;
    const s = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
      auth: { token }
    });
    setSocket(s);
    return () => s.disconnect();
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
