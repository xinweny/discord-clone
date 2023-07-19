import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';

import { cloudinaryAxios } from '@services/axios';

export const cloudinaryBaseQuery = (): BaseQueryFn<
  {
    url: string,
    method: AxiosRequestConfig['method'];
    params: AxiosRequestConfig['params'];
    file: File;
  },
  unknown,
  unknown
> => async ({ url, method, file, params }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const result = await cloudinaryAxios({
      url,
      method,
      data: formData,
      params,
    });

    return result.data.secure_url;
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};