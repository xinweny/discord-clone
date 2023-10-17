import { Socket } from 'socket.io';

import env from '@config/env';

import { statusHandler } from './users/status/handler';
import { messageHandler } from './messages/handler';
import { webRtcHandler, roomHandler } from './webrtc/handler';
import { readStatusHandler } from './readStatus/handler';

export const connectionHandler = async (socket: Socket) => {
  socket.join(socket.user._id);

  if (env.NODE_ENV === 'development') console.log(`${socket.id} connected`);

  roomHandler(socket);

  statusHandler(socket);

  messageHandler(socket);

  webRtcHandler(socket);
  
  readStatusHandler(socket);

  if (env.NODE_ENV === 'development') socket.on('disconnect', () => { console.log(`${socket.id} disconnected`); });
};