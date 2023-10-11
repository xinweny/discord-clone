import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@config';

const api = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'api',
  endpoints() { return {}; },
  tagTypes: [
    'JoinedServers',
    'Messages',
    'User',
    'Server',
    'Channels',
    'Categories',
    'CustomEmojis',
    'Roles',
    'MemberRoles',
    'ServerMembers',
    'ServerMember',
    'ServerMemberSelf',
    'Reactions',
    'Relations',
    'DMs',
    'DM',
    'MutualServers',
    'MutualFriends',
    'WebRTC',
    'Participants',
  ],
});

export default api;