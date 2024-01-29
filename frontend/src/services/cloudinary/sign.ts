import { dcAxios } from '@services/axios';

export type SignData = {
  timestamp: string;
  signature: string;
  folder: string;
};

export const sign = async (
  url: string,
  filename: string | string[]
): Promise<SignData | SignData[]> => {
  const result = await dcAxios({
    url: `/upload/${url}`,
    method: 'post',
    data: (typeof filename === 'string' ? { filename } : { filenames: filename }),
  });

  return result.data.data;
};