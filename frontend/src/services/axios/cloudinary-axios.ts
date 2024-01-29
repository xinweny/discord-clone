import axios from 'axios';

import { env } from '@config';

const CLOUDINARY_API_BASE_CONFIG = {
  baseURL: `https://api.cloudinary.com/v1_1/${env.VITE_CLOUD_NAME}`,
  headers: {
    'Content-Type': 'mulitpart/form-data',
  },
};

const cloudinaryAxios = axios.create(CLOUDINARY_API_BASE_CONFIG);

cloudinaryAxios.interceptors.request.use(config => {
  config.params = {
    api_key: env.VITE_CLOUDINARY_API_KEY,
    ...config.params,
  };

  return config;
});

export { cloudinaryAxios };