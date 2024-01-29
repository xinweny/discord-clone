import { Socket } from 'socket.io';

export const reactionHandler = async (socket: Socket) => {
  socket.on('reaction:create', async ({ reaction, roomId }) => {
    socket.to(roomId)
      .emit('reaction:create', reaction);
  });

  socket.on('reaction:increment', async ({ reaction, roomId }) => {
    socket.to(roomId)
      .emit('reaction:increment', reaction);
  });

  socket.on('reaction:decrement', async ({ reaction, roomId }) => {
    socket.to(roomId)
      .emit('reaction:decrement', reaction);
  });
};