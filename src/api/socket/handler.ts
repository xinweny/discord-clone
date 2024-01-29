import { Socket } from 'socket.io';

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