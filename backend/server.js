import express from 'express';
import http from 'http';
import socketIo from './sockets/socket.js';
import connectDB from './config/db.js';
import notificationRoutes from './routes/notifications.js';
import communicationRoutes from './routes/communications.js';
import { authenticate } from './middleware/authenticate.js'; // Assuming authenticate is exported as named export

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Set up EJS
app.set('view engine', 'ejs');

// Routes
app.use('/api', authenticate, notificationRoutes);
app.use('/api', authenticate, communicationRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Example route to render the EJS view
app.get('/', (req, res) => {
  // Assuming userId is fetched from the session or database
  const userId = 'some-user-id'; // Replace with actual logic to get userId
  res.render('index', { userId });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
