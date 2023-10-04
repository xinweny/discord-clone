import api from '@services/api';

import type {
  AuthData,
  LoginFields,
  RegisterFields,
} from './types';
import type { UserSelfData } from '@features/users/types';

const authApi = api.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<AuthData, LoginFields>({
        query: ({ email, password }) => ({
          url: '/auth/login',
          method: 'post',
          data: { email, password },
          config: { withCredentials: true },
        }),
      }),
      register: build.mutation<UserSelfData, RegisterFields>({
        query: ({ email, displayName, username, password }) => ({
          url: '/auth/signup',
          method: 'post',
          data: {
            email,
            displayName,
            username,
            password,
          },
        }),
      }),
      refreshToken: build.query<AuthData, void>({
        query: () => ({
          url: '/auth/refresh',
          method: 'post',
          config: { withCredentials: true },
        }),
      }),
      logout: build.mutation<AuthData, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'delete',
          config: { withCredentials: true },
        }),
      }),
      checkUsernameAvailability: build.query<boolean, string>({
        query: (username) => ({
          url: '/auth/check',
          method: 'get',
          params: { username },
        }),
      }),
    };
  }
});

export default authApi;

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
} = authApi;