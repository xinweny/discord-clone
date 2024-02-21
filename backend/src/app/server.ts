import { createServer } from 'http';
import { Server } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

import env from '@config/env.js';

import { app } from './app.js';

import { socketIo } from '@config/socketio.js';
import { terminus } from '@config/terminus.js';

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

terminus(server);

export default server;