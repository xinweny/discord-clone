import { Socket } from 'socket.io';

import { livekitService } from '@services/livekit';

export const webRtcHandler = async (socket: Socket) => {
  socket.on('participants:get', async (roomId: string) => {
    const participants = await livekitService.listParticipants(roomId);
  
    socket.to(roomId)
      .emit('participants:get', {
        roomId,
        participants,
      });
  });

};