import { Socket } from 'socket.io';

import { io } from '@app/server';

import { livekitClient } from '@config/livekit';

export const webRtcHandler = async (socket: Socket) => {
  socket.on('participants:get', async (roomId: string) => {
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