import { Socket } from 'socket.io';

import { livekitService } from '@services/livekit';

export const webRtcHandler = async (socket: Socket) => {
  socket.on('participants:get', async (data: {
    roomId: string,
    serverId: string | undefined,
    participantId: string,
  }) => {
    const { roomId, serverId } = data;

    const participant = await livekitService.listParticipants(roomId);
  
    socket.to(serverId || roomId)
      .emit('participants:get', participant);
  });

};