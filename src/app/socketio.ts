import { Server } from 'socket.io';

import { connectionHandler } from '@api';
import { authHandler } from '@api/auth';

export const socketIo = (io: Server) => {
  io
    .use(authHandler.authenticate)
    .on('connection', connectionHandler)
    .on('error', () => console.log('Error opening server'));
};