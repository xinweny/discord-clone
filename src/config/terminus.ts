import { createTerminus } from '@godaddy/terminus';

import type { Server } from 'http';

import db from './db';
import { redisClient } from './redis';

const cleanup = async () => {
  return Promise.all([
    db.close(),
    await redisClient.quit(),
  ]);
};

export const terminus = (server: Server) => {
  createTerminus(server, {
    signal: 'SIGINT',
    onSignal: cleanup,
  });
};