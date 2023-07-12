import { ListenerMiddleware } from '@reduxjs/toolkit';

import { socket, store } from '@app';

import { authApi } from '@services/api';

export const socketMiddleware: ListenerMiddleware = () => (next) => (action) => {
  const { type } = action;

  switch (type) {
    case 'socket/connect':
      socket.auth = { token: authApi.endpoints.refreshToken.select()(store.getState()).data?.accessToken };
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