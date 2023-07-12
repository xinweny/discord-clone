import { io } from 'socket.io-client';

import { env } from '@config';

const URL = env.VITE_API_URL;

export const socket = io(URL, {
  autoConnect: false,
});