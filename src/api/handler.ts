import { Socket } from 'socket.io';

import { statusHandler } from './users/status/handler';

export const connectionHandler = async (socket: Socket) => {
  socket.join(socket.user._id);
  console.log(`${socket.id} connected`);

  socket.on('join', (roomName: string | string[]) => {
    socket.join(roomName);
  });

  socket.on('disconnect', () => { console.log(`${socket.id} disconnected`); });

  statusHandler(socket);
};