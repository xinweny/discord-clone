import api from '@services/api';

import {
  type FriendRequestData,
  type SendFriendRequestFields,
  type RelationData,
  RelationStatus,
  AcceptFriendRequestFields,
  RemoveRelationFields,
} from './types';

const relationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getRelations: build.query<RelationData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/relations`,
          method: 'get',
        }),
        providesTags: (...[, , userId]) => [{ type: 'Relations', id: userId }],
      }),
      sendFriendRequest: build.mutation<FriendRequestData, SendFriendRequestFields>({
        query: ({ senderId, username, recipientId }) => ({
          url: `/users/${senderId}/relations`,
          method: 'post',
          data: {
            status: RelationStatus.PENDING_TO,
            username,
            userId: recipientId,
          },
        }),
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
      acceptFriendRequest: build.mutation<FriendRequestData, AcceptFriendRequestFields>({
        query: ({ senderId, relationId }) => ({
          url: `/users/${senderId}/relations/${relationId}`,
          method: 'put',
        }),
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
      removeRelation: build.mutation<FriendRequestData, RemoveRelationFields>({
        query: ({ senderId, relationId, status }) => ({
          url: `/users/${senderId}/relations/${relationId}`,
          method: 'delete',
          data: { status },
        }),
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'Relations', id: senderId }],
      }),
    };
  }
});

export default relationApi;

export const {
  useGetRelationsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRemoveRelationMutation,
} = relationApi;