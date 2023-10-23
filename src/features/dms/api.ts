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

import { joinRooms, setupSocketEventListeners } from '@services/websocket';

import { signAndUpload } from '@services/cloudinary';
import { emitEvents } from '@services/websocket';

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
              updateCachedData((draft) => {
                if (message.type !== 'dm') return draft;

                const { roomId: dmId } = message;

                const index = draft.findIndex(dm => dm._id === dmId);

                index !== -1
                  ? draft.unshift(draft.splice(index, 1)[0])
                  : dispatch(dmApi.endpoints.getDm.initiate({
                    dmId,
                    userId,
                  }));

                return draft;
              });
            },
            [DMEvent.New]: (dm: DMData) => {
              joinRooms(dm._id);
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
        onQueryStarted: async ({ dmId, userId }, { queryFulfilled, dispatch }) => {
          const { data: dm } = await queryFulfilled;

          if (userId) dispatch(dmApi.util.updateQueryData(
            'getDms',
            userId,
            (draft) => {
              const i = draft.findIndex(dm => dm._id === dmId);

              if (i === -1) draft.unshift(dm);

              return draft;
            }
          ));
        }
      }),
      createDm: build.mutation<DMData, CreateDMFields>({
        query: ({ participantIds }) => ({
          url: '/dms',
          method: 'post',
          data: { participantIds },
        }),
        invalidatesTags: ['DMs'],
        onQueryStarted: async (args, { queryFulfilled }) => {
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