import api from '@services/api';

import type {
  FriendRequestData,
  SendFriendRequestFields,
  RelationData,
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
            status: 'request',
            username,
            userId: recipientId,
          },
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
} = relationApi;