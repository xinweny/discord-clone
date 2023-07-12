import axios from 'axios';

import { store } from '@app';

import { authApi } from '@services/api';

const DISCORD_CLONE_API_BASE_CONFIG = {
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const dcAxios = axios.create(DISCORD_CLONE_API_BASE_CONFIG);

// Attach access token to Authorization header
dcAxios.interceptors.request.use(config => {
  const result = authApi.endpoints.refreshToken.select()(store.getState());

  const accessToken = result.data?.accessToken;

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// Handling expired tokens
dcAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (
      (originalReq.url !== '/auth/refresh')
      && err.response.status === 401
      && !originalReq._retry
    ) {
      originalReq._retry = true;

      const result = store.dispatch(authApi.endpoints.refreshToken.initiate());

      const response = await result.unwrap();

      const { accessToken } = response;
      
      originalReq.headers.Authorization = `Bearer ${accessToken}`;

      result.unsubscribe();

      return dcAxios(originalReq);
    }

    return Promise.reject(err);
  }
);

export {
  dcAxios,
};