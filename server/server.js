const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const setupSocket = require('./socket/sockethandler');
const errorHandler = require('./middleware/errorhandler');
const { apiLimiter, authLimiter } = require('./middleware/ratelimiter');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Setup socket
setupSocket(server);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authLimiter, require('./routes/authroutes'));
app.use('/api/quiz', require('./routes/quizroutes'));
app.use('/api/logs', require('./routes/logroutes'));
app.use('/api/progress', require('./routes/progressroutes'));
app.use('/api/roadmap', require('./routes/roadmaproutes'));
app.use('/api/peers', require('./routes/peerroutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Progress Analyser API is running' });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
