import { Socket } from 'socket.io';

import { io } from '@app/server';

export const memberStatusHandler = async (socket: Socket) => {
  socket.on('member_status:update', async ({
    userId,
    status,
    serverIds,
  }) => {    
    io
      .to(serverIds)
      .emit('member_status:update', { status, userId });
  });
};