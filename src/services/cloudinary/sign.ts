import { dcAxios } from '@services/axios';

export const sign = async (
  url: string,
  filename: string
) => {
  const result = await dcAxios({
    url: `/upload/${url}`,
    method: 'post',
    data: { filename },
  });

  return result.data.data;
};