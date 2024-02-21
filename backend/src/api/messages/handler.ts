import { Socket } from 'socket.io';

import { IMessage } from './model.js';

export const messageHandler = async (socket: Socket) => {
  socket.on('message:send', async (message: IMessage) => {
    socket.to(message.roomId.toString())
      .emit('message:send', message);
  });

  socket.on('message:update', async (message: IMessage) => {
    socket.to(message.roomId.toString())
      .emit('message:update', message);
  });

  socket.on('message:delete', async (message: IMessage) => {
    socket.to(message.roomId.toString())
      .emit('message:delete', message);
  });
};