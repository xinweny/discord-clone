import { Socket } from 'socket.io';

import { readStatusService } from './service';

export const readStatusHandler = async (socket: Socket) => {
  socket.on('read_status:update', async (data: {
    userId: string,
    roomId: string,
    serverId?: string,
  }) => {
    const { userId, roomId, serverId } = data;

    const readStatus = await readStatusService.update(userId, roomId, serverId);

    return readStatus;
  });
};