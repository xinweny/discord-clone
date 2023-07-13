import api from './root';

import type { UserSelfData } from '@features/user/types';

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUserSelf: build.query<UserSelfData, string>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'get',
          withCredentials: true,
        })
      }),
    };
  }
});

export const {
  useGetUserSelfQuery,
} = userApi;