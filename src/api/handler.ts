import { Socket } from 'socket.io';

import { statusHandler } from './users/status/handler';
import { messageHandler } from './messages/handler';

export const connectionHandler = async (socket: Socket) => {
  socket.join(socket.user._id);
  console.log(`${socket.id} connected`);

  socket.on('join', (roomName: string | string[]) => {
    socket.join(roomName);
  });

  socket.on('leave', (roomName: string | string[]) => {
    if (Array.isArray(roomName)) {
      roomName.forEach(room => { socket.leave(room); });
    } else {
      socket.leave(roomName);
    }
  });

  socket.on('disconnect', () => { console.log(`${socket.id} disconnected`); });

  statusHandler(socket);
  messageHandler(socket);
};