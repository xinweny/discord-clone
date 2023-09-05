import api from '@services/api';

import type {
  FriendRequestData,
  CreateFriendRequestFields,
} from './types';

const relationApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getFriendRequests: build.query<FriendRequestData[], string>({
        query: (userId) => ({
          url: `/users/${userId}/relations`,
          method: 'get',
          params: { status: 'request' },
        }),
        providesTags: (...[, , userId]) => [{ type: 'FriendRequests', id: userId }],
      }),
      sendFriendRequest: build.mutation<FriendRequestData, CreateFriendRequestFields>({
        query: ({ senderId, username, recipientId }) => ({
          url: `/users/${senderId}/relations`,
          method: 'post',
          data: {
            status: 'request',
            username,
            userId: recipientId,
          },
        }),
        invalidatesTags: (...[, , { senderId }]) => [{ type: 'FriendRequests', id: senderId }],
      }),
    };
  }
});

export default relationApi;

export const {
  useGetFriendRequestsQuery,
  useSendFriendRequestMutation,
} = relationApi;