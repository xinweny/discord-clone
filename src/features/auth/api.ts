import api from '@services/api';

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
          method: 'post',
          data: { email, password },
          config: { withCredentials: true },
        }),
      }),
      refreshToken: build.query<AuthData, void>({
        query: () => ({
          url: '/auth/refresh',
          method: 'post',
          config: { withCredentials: true },
        }),
      }),
      logout: build.query<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'delete',
          config: { withCredentials: true },
        }),
      }),
    };
  }
});

export default authApi;

export const {
  useLoginQuery,
  useLazyLoginQuery,
  useRefreshTokenQuery,
  useLazyLogoutQuery,
} = authApi;