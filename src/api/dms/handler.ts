import { Socket } from 'socket.io';

import { io } from '@app/server';

export class DmHandler {
  userId: string;
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
    this.userId = socket.user._id;
  }

  async subscribe(payload: {
    roomId: string,
    participantIds: string[],
  }) {
    const { roomId, participantIds } = payload;

    const sessions = await Promise.all(
      participantIds.map(id => id) // TODO: get sessions
    );
    
    const sockets = sessions
      .filter(session => session !== null)
      .map(socketId => io.sockets.sockets.get(socketId as string));

    sockets.push(this.socket);

    for (const socket of sockets) {
      if (socket) socket.join(roomId);
    }
  }
}