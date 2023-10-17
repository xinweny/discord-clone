import { Socket } from 'socket.io';

import { livekitService } from '@services/livekit';

export const roomHandler = async (socket: Socket) => {
  socket.on('join', (roomName: string | string[]) => {
    socket.join(roomName);
  });

  socket.on('leave', (roomName: string | string[]) => {
    if (Array.isArray(roomName)) {
      roomName.forEach(room => { socket.leave(room); });
    } else {
      socket.leave(roomName);
    }
  });
};

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