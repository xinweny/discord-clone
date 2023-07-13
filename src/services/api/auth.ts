import api from './root';

import type { FieldValues } from 'react-hook-form';

interface AuthData {
  userId: string;
  accessToken: string;
}

const authApi = api.injectEndpoints({
  endpoints(build) {
    return {
      login: build.query<AuthData, FieldValues>({
        query: ({ email, password }) => ({
          url: '/auth/login',
          method: 'get',
          data: { email, password },
          config: { withCredentials: true },
        })
      }),
      refreshToken: build.query<AuthData, void>({
        query: () => ({
          url: '/auth/refresh',
          method: 'post',
          config: { withCredentials: true },
        })
      }),
    };
  }
});

export default authApi;

export const {
  useLoginQuery,
  useRefreshTokenQuery,
} = authApi;