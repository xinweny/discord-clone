import { Socket } from 'socket.io';

import { io } from '@app/server.js';

import { livekitClient } from '@config/livekit.js';

export const webRtcHandler = async (socket: Socket) => {
  socket.on('participants:get', async ({
    roomId,
  }) => {
    try {
      const participants = await livekitClient.listParticipants(roomId);
  
      io.to(roomId)
        .emit('participants:get', {
          roomId,
          participants,
        });
    } catch {
      return;
    }
  });
};