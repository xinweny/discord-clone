import { Socket } from 'socket.io';

export const broadcastToRooms = (socket: Socket, room: string, events: string | string[]) => {
  const eventNames = (Array.isArray(events)) ? events : [events];

  for (const evt of eventNames) {
    socket.on(evt, async (data: any) => {
      socket.to(room).emit(evt, data);
    });
  }
}