import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@config';

export const dcApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'dcApi',
  endpoints(build) {
    return {
      
    };
  }
});