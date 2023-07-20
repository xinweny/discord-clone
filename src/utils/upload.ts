import { cloudinaryAxios } from '@services/axios';

export const upload = async (
  file: File,
  params: {
    signature: string,
    timestamp: number,
    folder: string,
  },
  publicId?: string
) => {
  const { signature, timestamp, folder } = params;

  const formData = new FormData();
  formData.append('file', file);

  const result = await cloudinaryAxios({
    url: '/upload',
    method: 'post',
    data: formData,
    params: {
      signature,
      timestamp,
      folder,
      public_id: publicId || file.name.replace(/\.[^/.]+$/, ''),
    },
  });

  return result;
};