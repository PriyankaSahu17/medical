import { Server } from 'socket.io';

const setupSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (userId) => {
      socket.join(userId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export default setupSocket;
