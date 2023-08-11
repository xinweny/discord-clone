import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@config';

const api = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'api',
  endpoints() { return {}; },
  tagTypes: [
    'JoinedServers',
    'User',
    'Channels',
    'Categories',
  ],
});

export default api;