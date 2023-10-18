import { Socket } from 'socket.io';

import { notificationService } from './service';

export const notificationHandler = async (socket: Socket) => {
  socket.on('read_status:update', async (data: {
    roomId: string,
    serverId?: string,
    lastReadAt: number,
  }) => {
    const userId = socket.user._id;

    const readStatus = await notificationService.updateReadStatus({
      userId,
      ...data,
    });

    socket.to(userId)
      .emit('read_status:update', readStatus);
  });
};