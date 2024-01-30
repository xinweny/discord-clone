import api from '@services/api';

import {
  type FriendRequestData,
  type CreateRelationFields,
  type RelationData,
  type AcceptFriendRequestFields,
  type RemoveRelationFields,
  RelationEvent,
} from './types';

import { emitEvents, setupSocketEventListeners } from '@services/websocket';

const relationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getRelations: build.query<RelationData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/relations`,
          method: 'get',
        }),
        onCacheEntryAdded: async (
          userId,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) => {
          const events = {
            [RelationEvent.Create]: (relation: RelationData) => {
              updateCachedData((draft) => {
                draft.push(relation);

                return draft;
              });
            },
            [RelationEvent.Update]: (relation: RelationData) => {
              updateCachedData((draft) => {
                const index = draft.findIndex(r => r.userId === relation.userId);

                if (index !== -1) draft[index].status = relation.status;

                return draft;
              });
            },
            [RelationEvent.Delete]: (senderId: string) => {
              updateCachedData((draft) => {
                draft = draft.filter(r => r.userId !== senderId);

                return draft;
              });
            }
          };

          setupSocketEventListeners(
            events,
            { cacheDataLoaded, cacheEntryRemoved },
          );
        },
        providesTags: (...[, , userId]) => [{ type: 'Relations', id: userId }],
      }),
      createRelation: build.mutation<FriendRequestData, CreateRelationFields>({
        query: ({ senderId, username, recipientId, status }) => ({
          url: `/users/${senderId}/relations`,
          method: 'post',
          data: {
            status,
            username,
            userId: recipientId,
          },
        }),
        onQueryStarted: async (userId, { queryFulfilled }) => {
          try {
            const { data: relation } = await queryFulfilled;

            emitEvents({ [RelationEvent.Create]: relation.userId });
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
      acceptFriendRequest: build.mutation<FriendRequestData, AcceptFriendRequestFields>({
        query: ({ senderId, relationId }) => ({
          url: `/users/${senderId}/relations/${relationId}`,
          method: 'put',
        }),
        onQueryStarted: async (userId, { queryFulfilled }) => {
          try {
            const { data: relation } = await queryFulfilled;

            emitEvents({ [RelationEvent.Update]: relation.userId });
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
      removeRelation: build.mutation<FriendRequestData, RemoveRelationFields>({
        query: ({ senderId, relationId }) => ({
          url: `/users/${senderId}/relations/${relationId}`,
          method: 'delete',
        }),
        onQueryStarted: async ({ senderId }, { queryFulfilled }) => {
          try {
            const { data: relation } = await queryFulfilled;

            const { userId: recipientId } = relation;

            emitEvents({ [RelationEvent.Delete]: { senderId, recipientId } });
          } catch (err) {
            console.log(err);
          }
        },
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
    };
  }
});

export default relationApi;

export const {
  useGetRelationsQuery,
  useCreateRelationMutation,
  useAcceptFriendRequestMutation,
  useRemoveRelationMutation,
} = relationApi;