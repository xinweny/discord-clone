import { socket } from '@app';

export const joinRooms = (roomName: string | string[]) => {
  socket.emit('join', roomName);

  return () => { socket.emit('leave', roomName); };
};