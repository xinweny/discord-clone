import api from '@services/api';

import { setupSocketListeners } from '@utils';

import {
  type UserData,
  type UserSelfData,
  type UpdateUserFields,
  StatusEvent,
  type StatusEventPayload,
} from '@features/users/types';

import { signAndUpload } from '@services/cloudinary';

const userApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getUser: build.query<UserData, string>({
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
      }),
      getUserStatus: build.query<boolean, string>({
        query: (userId) => ({
          url: `users/${userId}/status`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          console.log('cache entry added');
          const events = {
            [StatusEvent.Get]: ({ status, userId: uid }: StatusEventPayload) => {
              if (userId !== uid) return;

              console.log(`get status response #${uid}`, status);

              updateCachedData(() => status);
            },
          };

          setupSocketListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
            `user_status#${userId}`
          );

          console.log('END SETUP');
        },
      }),
    };
  }
});

export default userApi;

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetUserStatusQuery,
} = userApi;