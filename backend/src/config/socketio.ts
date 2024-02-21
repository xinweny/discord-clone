import { Server } from 'socket.io';

import { connectionHandler } from '@api/handler.js';
import { authHandler } from '@api/auth/handler.js';

export const socketIo = (io: Server) => {
  io
    .use(authHandler.authenticate)
    .on('connection', connectionHandler)
    .on('error', () => console.log('Error opening server'));
};