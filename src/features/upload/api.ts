import api from '@services/api';

import type { FieldValues } from 'react-hook-form';

type SignatureData = {
  signature: string;
  timestamp: number;
  folder: string;
  publicId: string;
};

const uploadApi = api.injectEndpoints({
  endpoints(build) {
    return {
      signServerAvatarUpload: build.query<SignatureData, FieldValues>({
        query: ({ serverId, filename }) => ({
          url: `/upload/avatars/servers/${serverId}`,
          method: 'post',
          data: { filename },
        }),
      }),
      signAttachmentsUpload: build.query<SignatureData, FieldValues>({
        query: ({ serverId, roomId, messageId, filenames }) => ({
          url: `/upload/attachments/${messageId}`,
          method: 'post',
          data: { filenames },
          params: { roomId, serverId },
        }),
      }),
    };
  }
});

export default uploadApi;

export const {
  useLazySignServerAvatarUploadQuery,
  useLazySignAttachmentsUploadQuery,
} = uploadApi;