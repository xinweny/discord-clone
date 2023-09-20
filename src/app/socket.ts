import { io } from 'socket.io-client';

import { env } from '@config';

const BASE_URL = env.VITE_API_URL;

export const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});