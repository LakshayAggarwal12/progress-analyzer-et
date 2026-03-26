import { useContext } from 'react';
import { SocketContext } from '../context/socketcontext';

export const useSocket = () => useContext(SocketContext);
