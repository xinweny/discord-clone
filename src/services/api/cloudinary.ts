import { createApi } from '@reduxjs/toolkit/query/react';

import { cloudinaryBaseQuery } from '@config';

type UploadFields = {
  file: File;
  signature: string;
  timestamp: string;
}

export const cloudinaryApi = createApi({
  baseQuery: cloudinaryBaseQuery(),
  reducerPath: 'cloudinary',
  endpoints: (build) => ({
    upload: build.query<unknown, UploadFields>({
      query: ({ file, signature, timestamp }) => ({
        url: '/upload',
        method: 'post',
        file,
        params: {
          signature,
          timestamp,
          public_id: file.name,
        },
      }),
    }),
  }),
  tagTypes: [],
});