import { Socket } from 'socket.io';

import { IDM } from './model';

export const messageHandler = async (socket: Socket) => {
  socket.on('dm:new', async (dm: IDM) => {
    const userId = socket.user._id;
    const participantIds = dm.participantIds
      .filter(id => id.toString() !== userId)
      .map(id => id.toString());

    socket.to(participantIds)
      .emit('dm:new', dm);
  });
};