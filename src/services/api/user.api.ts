import { dcApi } from '.';

import type { UserSelfData } from '@features/user/types';

const userApi = dcApi.injectEndpoints({
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