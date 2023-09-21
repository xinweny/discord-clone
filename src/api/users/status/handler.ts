import { Socket } from 'socket.io';

import { io } from '@app/server';

import { statusService } from '@api/users/status/service';

export const statusHandler = async (socket: Socket) => {
  const userId = socket.user._id;

  const isAlreadyOnline = await statusService.getStatus(userId);
  if (!isAlreadyOnline) io.to(`${userId}_status`).emit('user:online');

  await statusService.set(socket);

  socket.on('user:status', async (uid: string) => {
    const status = await statusService.getStatus(uid);
    
    io.to(userId).emit(`user:${status ? 'online' : 'offline'}`);
  });

  socket.on('disconnect', async () => {
    await statusService.remove(socket);

    const isStillOnline = await statusService.getStatus(userId);

    if (!isStillOnline) io.to(`${userId}_status`).emit('user:offline');
  });
};