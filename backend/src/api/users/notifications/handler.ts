import { Socket } from 'socket.io';

import { io } from '@app/server.js';

import { notificationService } from './service.js';

export const notificationHandler = async (socket: Socket) => {
  const userId = socket.user._id;

  socket.on('read_status:update', async (data: {
    roomId: string,
    serverId?: string,
    lastReadAt: Date,
  }) => {
    const readStatus = await notificationService.updateReadStatus({
      userId,
      ...data,
    });

    io.to(userId)
      .emit('read_status:update', readStatus);
  });
};