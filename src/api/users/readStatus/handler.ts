import { Socket } from 'socket.io';

import { readStatusService } from './service';

export const readStatusHandler = async (socket: Socket) => {
  socket.on('read_status:update', async (data: {
    roomId: string,
    serverId?: string,
    lastReadAt: number,
  }) => {
    const userId = socket.user._id;

    const readStatus = await readStatusService.update({
      userId,
      ...data,
    });

    socket.to(userId)
      .emit('read_status:update', readStatus);
  });
};