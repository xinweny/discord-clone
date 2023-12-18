import api from '@services/api';

import { setupSocketEventListeners } from '@services/websocket';

import type {
  UserData,
  UserSelfData,
  UpdateUserFields,
  GetStatusEventPayload,
  UpdateSensitiveFields,

} from '@features/users/types';
import { StatusEvent } from '@features/users/types';

import { signAndUpload } from '@services/cloudinary';

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUser: build.query<UserData | UserSelfData, string>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'get',
        }),
        providesTags: (...[, , userId]) => [{ type: 'User', id: userId }],
      }),
      updateUser: build.mutation<UserSelfData, UpdateUserFields>({
        query: ({
          userId,
          file,
          displayName,
          username,
          bannerColor,
          bio,
        }) => ({
          url: `/users/${userId}`,
          method: 'put',
          data: {
            displayName,
            username,
            bannerColor,
            bio,
            filename: file?.name,
          },
        }),
        onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
          try {
            const { data: user } = await queryFulfilled;

            const userId = user.id;

            if (file) await signAndUpload(file, `/avatars/users/${userId}`, userId);
  
            dispatch(api.util.invalidateTags([{type: 'User', id: userId }]));
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: (...[, , { userId }]) => [{ type: 'User', id: userId }],
      }),
      getUserStatus: build.query<boolean, string>({
        query: (userId) => ({
          url: `/users/${userId}/status`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [StatusEvent.Get]: ({ status, userId: uid }: GetStatusEventPayload) => {
              if (userId !== uid) return;

              updateCachedData(() => status);
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
            `user_status#${userId}`
          );
        },
      }),
      updateSensitive: build.mutation<UserSelfData, UpdateSensitiveFields>({
        query: ({ userId, currentPassword, password, username }) => ({
          url: `/users/${userId}`,
          params: { sensitive: true },
          method: 'put',
          data: {
            currentPassword,
            username,
            password,
          },
        }),
        invalidatesTags: (...[, , { userId }]) => [{ type: 'User', id: userId }],
      }),
    };
  }
});

export default userApi;

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetUserStatusQuery,
  useUpdateSensitiveMutation,
} = userApi;