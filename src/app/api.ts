import axios from 'axios';

import { store } from './store';

import { refreshAccessToken } from '@features/auth/ducks/actions';

const DISCORD_CLONE_API_BASE_CONFIG = {
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const dcApi = axios.create(DISCORD_CLONE_API_BASE_CONFIG);

// Attach access token to Authorization header
dcApi.interceptors.request.use(config => {
  const accessToken = store.getState().auth.token;
  config.headers.Authorization = accessToken;

  return config;
});

// Handling expired tokens
dcApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (err.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      await store.dispatch(refreshAccessToken());
      const accessToken = store.getState().auth.token;
      
      originalReq.headers.Authorization(`Bearer ${accessToken}`);

      return dcApi(originalReq);
    }

    return Promise.reject(err);
  }
);

export {
  dcApi,
}