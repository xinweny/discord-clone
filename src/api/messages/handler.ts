import { Socket } from 'socket.io';

import { IMessage } from './model';

export const messageHandler = async (socket: Socket) => {
  socket.on('message:send', async (message: IMessage) => {
    socket.to(message.roomId.toString())
      .emit('message:send', message);
  });
};