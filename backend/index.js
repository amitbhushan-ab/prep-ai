const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

dotenv.config({ path: path.join(__dirname, '.env') });

const missingEnv = ['JWT_SECRET'].filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(', ')}. ` +
      'Copy backend/.env.example to backend/.env and fill them in.'
  );
  process.exit(1);
}

const PORT = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Same-origin and server-to-server requests have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PrepAI API with sockets is running.');
});

app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/prepai', require('./routes/prepAIRoutes'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit('user_joined', { userId: socket.id });
  });

  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', data);
  });

  // WebRTC signalling
  socket.on('call-user', (data) => {
    socket.to(data.toRoom).emit('call-made', { offer: data.offer, socket: socket.id });
  });

  socket.on('make-answer', (data) => {
    socket.to(data.toSocket).emit('answer-made', { answer: data.answer, socket: socket.id });
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.toRoom).emit('ice-candidate', {
      candidate: data.candidate,
      socket: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`PrepAI server + sockets running on port ${PORT}`));
