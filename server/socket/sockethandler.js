const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  // Auth middleware for socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user?.name}`);
    
    // Join personal room
    socket.join(socket.user._id.toString());

    // Join peer chat room
    socket.on('join_chat', (peerId) => {
      const roomId = [socket.user._id.toString(), peerId].sort().join('_');
      socket.join(roomId);
    });

    // Send message via socket
    socket.on('send_message', ({ peerId, text }) => {
      const roomId = [socket.user._id.toString(), peerId].sort().join('_');
      const message = {
        sender: socket.user._id,
        senderName: socket.user.name,
        text,
        timestamp: new Date()
      };
      io.to(roomId).emit('receive_message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user?.name}`);
    });
  });

  return io;
};

module.exports = setupSocket;
