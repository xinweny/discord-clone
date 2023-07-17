import { Socket } from 'socket.io';

import { connectionService } from '@services/connection';

export const connectionHandler = async (socket: Socket) => {
  await connectionService.set(socket);
  console.log(`${socket.id} connected`);

  socket.on('disconnect', async () => {
    await connectionService.remove(socket.user._id);
    console.log(`${socket.id} disconnected`);
  });
};