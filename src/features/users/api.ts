import api from '@services/api';

import { setupSocketListeners, initEvents } from '@utils';

import {
  type UserData,
  type UserSelfData,
  type UpdateUserFields,
  StatusEvent,
  type StatusPayload,
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
        queryFn: () => ({ data: false }),
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [StatusEvent.Get]: ({ status, userId: uid }: StatusPayload) => {
              console.log('response', status);
              if (userId === uid) updateCachedData(() => status);
            },
          };

          setupSocketListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
          
          initEvents({
            events: {
              [StatusEvent.Get]: userId,
            },
            rooms: `user_status#${userId}`,
          });
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