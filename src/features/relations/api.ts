import api from '@services/api';

import type {
  FriendRequestData,
  CreateRelationFields,
  RelationData,
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
        query: ({ senderId, relationId }) => ({
          url: `/users/${senderId}/relations/${relationId}`,
          method: 'delete',
        }),
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