import { Socket } from 'socket.io';

import { authService } from './service.js';

const authenticate = async (
  socket: Socket,
  next: (err?: any) => void,
) => {
    const token = socket.handshake.auth.token as string | undefined;

    if (!token) return next(new Error('Authentication failed.'));
  
    const user = authService.verifyAccessToken(token);

    if (!user) return next(new Error('Authentication failed.'));

    socket.user = user;

    next(); 
};

const verifyToken = (token: string) => {
  const user = authService.verifyAccessToken(token);

  return user;
}

export const authHandler = {
  authenticate,
  verifyToken,
};