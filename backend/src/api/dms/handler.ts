import { Socket } from 'socket.io';

import { io } from '@app/server.js';

import { IDM } from './model.js';

export const dmHandler = async (socket: Socket) => {
  socket.on('dm:new', async (dm: IDM) => {
    const userId = socket.user._id;
    const participantIds = dm.participantIds
      .filter(id => id.toString() !== userId)
      .map(id => id.toString());

    io.in(participantIds)
      .emit('dm:new', dm);
  });
};