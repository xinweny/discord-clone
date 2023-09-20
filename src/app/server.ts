import { createServer } from 'http';
import { Server } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

import env from '@config/env';

import { app } from './app';
import { socketIo } from './socketio';

const server = createServer(app);

declare module 'socket.io' {
  interface Socket {
    user: JwtPayload,
  }
}

export const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
});

socketIo(io);

export default server;