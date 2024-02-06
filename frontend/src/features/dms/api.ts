import api from '@services/api';

import {
  type DMData,
  type CreateDMFields,
  type EditDMFields,
  DMEvent,
  GetDMQuery,
} from './types';
import {
  MessageEvent,
  type MessageData,
} from '@features/messages/types';

import { setupSocketEventListeners, emitEvents } from '@services/websocket';

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
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
        ) => {
          const events = {
            [MessageEvent.Send]: (message: MessageData) => {
              if (message.type !== 'dm') return;

              updateCachedData((draft) => {
                const { roomId: dmId } = message;

                const index = draft.findIndex(dm => dm._id === dmId);

                if (index === -1) dispatch(dmApi.endpoints.getDm.initiate({
                  dmId,
                  userId,
                }));

                return draft;
              });
            },
            [DMEvent.New]: (dm: DMData) => {
              updateCachedData((draft) => {
                draft.unshift(dm);

                return draft;
              });
            },
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
      }),
      getDm: build.query<DMData, GetDMQuery>({
        query: ({ dmId }) => ({
          url: `/dms/${dmId}`,
          method: 'get',
        }),
        providesTags: (...[, , { dmId }]) => [{ type: 'DM', id: dmId }],
      }),
      createDm: build.mutation<DMData, CreateDMFields>({
        query: ({ participantIds }) => ({
          url: '/dms',
          method: 'post',
          data: { participantIds },
        }),
        onQueryStarted: async (_, { queryFulfilled }) => {
          const { data: dm } = await queryFulfilled;

          emitEvents({ [DMEvent.New]: dm });
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
            if (!avatar) return;

            const { data: dm } = await queryFulfilled;

            const dmId = dm._id;

            await signAndUpload(avatar, `/avatars/dms/${dmId}`, dmId);
  
            dispatch(api.util.invalidateTags([
              'DMs',
              { type: 'DM', id: dmId },
            ]));
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: ['DMs'],
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