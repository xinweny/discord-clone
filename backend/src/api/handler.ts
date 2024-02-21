import { Socket } from 'socket.io';

import env from '@config/env.js';

import { statusHandler } from './statuses/handler.js';
import { messageHandler } from './messages/handler.js';
import { webRtcHandler } from './webrtc/handler.js';
import { roomHandler } from './socket/handler.js';
import { notificationHandler } from './users/notifications/handler.js';
import { dmHandler } from './dms/handler.js';
import { reactionHandler } from './reactions/handler.js';
import { relationHandler } from './users/relations/handler.js';
import { serverMemberHandler } from './serverMembers/handler.js';

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

  relationHandler(socket);

  serverMemberHandler(socket);

  if (env.NODE_ENV === 'development') socket.on('disconnect', () => { console.log(`${socket.id} disconnected`); });
};