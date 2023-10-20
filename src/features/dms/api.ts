import api from '@services/api';

import type {
  DMData,
  CreateDMFields,
  EditDMFields,
  GetDMQuery,
} from './types';
import {
  MessageEvent,
  type MessageData,
} from '@features/messages/types';

import { setupSocketEventListeners } from '@services/websocket';

import { signAndUpload } from '@services/cloudinary';

const dmApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getDms: build.query<DMData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/dms`,
          method: 'get',
        }),
        providesTags: ['DMs'],
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [MessageEvent.Send]: (message: MessageData) => {
              updateCachedData((draft) => {
                const index = draft.findIndex(dm => dm._id === message.roomId);

                if (index !== -1) draft.unshift(...draft.splice(index, 1));

                return draft;
              });
            }
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
      getDm: build.query<DMData, GetDMQuery>({
        query: ({ dmId, dm }) => ({
          url: `/dms/${dmId}`,
          method: 'get',
          params: { dm: JSON.stringify(dm) },
        }),
        providesTags: (...[, , { dmId }]) => [{ type: 'DM', id: dmId }],
      }),
      createDm: build.mutation<DMData, CreateDMFields>({
        query: ({ participantIds }) => ({
          url: '/dms',
          method: 'post',
          data: { participantIds },
        }),
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          try {
            const { data: dm } = await queryFulfilled;
            
            const { participantIds } = dm;

            dispatch(dmApi.util.updateQueryData(
              'getDms',
              participantIds[0],
              (draft) => {
                if (dm) draft.unshift(dm);

                return draft;
              }
            ));
          } catch (err) {
            console.log(err);
          }
        },
      }),
      updateDm: build.mutation<DMData, EditDMFields>({
        query: ({ dmId, name }) => ({
          url: `/dms/${dmId}`,
          method: 'put',
          data: { name },
        }),
        onQueryStarted: async ({ avatar }, { dispatch, queryFulfilled }) => {
          try {
            if (avatar) {
              const { data: dm } = await queryFulfilled;

              const dmId = dm._id;
  
              await signAndUpload(avatar, `/avatars/groups/${dmId}`, dmId);
    
              dispatch(api.util.invalidateTags([
                'DMs',
                { type: 'DM', id: dmId },
              ]));
            }
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };
  }
});

export default dmApi;

export const {
  useGetDmsQuery,
  useGetDmQuery,
  useLazyGetDmQuery,
  useCreateDmMutation,
  useUpdateDmMutation,
} = dmApi;