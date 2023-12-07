import { Socket } from 'socket.io';

import env from '@config/env';

import { statusHandler } from './users/status/handler';
import { messageHandler } from './messages/handler';
import { webRtcHandler, roomHandler } from './webrtc/handler';
import { notificationHandler } from './users/notifications/handler';
import { dmHandler } from './dms/handler';
import { reactionHandler } from './reactions/handler';

export const connectionHandler = async (socket: Socket) => {
  socket.join(socket.user._id);

  if (env.NODE_ENV === 'development') console.log(`${socket.id} connected`);

  roomHandler(socket);

  statusHandler(socket);

  messageHandler(socket);

  dmHandler(socket);

  webRtcHandler(socket);
  
  notificationHandler(socket);

  reactionHandler(socket);

  if (env.NODE_ENV === 'development') socket.on('disconnect', () => { console.log(`${socket.id} disconnected`); });
};