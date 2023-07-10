import { ListenerMiddleware } from '@reduxjs/toolkit';
import { socket, store } from '@app';

export const socketMiddleware: ListenerMiddleware = () => (next) => (action) => {
  const { type } = action;

  switch (type) {
    case 'socket/connect':
      socket.auth = { token: store.getState().auth.token };
      socket.connect();
      break;

    case 'socket/disconnect':
      socket.disconnect();
      break;

    default:
      break;
  }

  return next(action);
};