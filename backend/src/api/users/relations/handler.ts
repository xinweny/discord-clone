import { Socket } from 'socket.io';

import { io } from '@app/server.js';

import { relationService } from './service.js';

export const relationHandler = async (socket: Socket) => {
  socket.on('relation:create', async (recipientId: string) => {
    const relation = await relationService.getRelation(socket.user._id, recipientId);

    io.to(recipientId)
      .emit('relation:create', relation);
  });

  socket.on('relation:update', async (recipientId: string) => {
    const relation = await relationService.getRelation(socket.user._id, recipientId);

    io.to(recipientId)
      .emit('relation:update', relation);
  });

  socket.on('relation:delete', async ({
    recipientId,
    senderId,
  }) => {
    io.to(recipientId)
      .emit('relation:delete', senderId);
  });
};