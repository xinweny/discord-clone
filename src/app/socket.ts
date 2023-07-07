import { io } from 'socket.io-client';

import { env } from '@common/config';

const URL = env.REACT_APP_CLIENT_URL;

export const socket = io(URL, {
  autoConnect: false,
});