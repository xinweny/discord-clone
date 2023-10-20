import { Socket } from 'socket.io';

import { io } from '@app/server';

import { notificationService } from './service';

export const notificationHandler = async (socket: Socket) => {
  socket.on('read_status:update', async (data: {
    roomId: string,
    serverId?: string,
    lastReadAt: Date,
  }) => {
    const userId = socket.user._id;

    const readStatus = await notificationService.updateReadStatus({
      userId,
      ...data,
    });

    io.to(userId)
      .emit('read_status:update', readStatus);
  });
};