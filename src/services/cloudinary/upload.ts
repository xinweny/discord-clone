import { cloudinaryAxios } from '@services/axios';

import type { SignData } from '.';

export const upload = async (
  file: File,
  params: SignData,
  publicId?: string
) => {
  const { signature, timestamp, folder } = params;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  formData.append(
    'public_id',
    encodeURIComponent(publicId || file.name.replace(/\.[^/.]+$/, '')))
  ;

  const result = await cloudinaryAxios({
    url: '/upload',
    method: 'post',
    data: formData,
    params: {
      signature,
      timestamp,
    },
  });

  return result;
};