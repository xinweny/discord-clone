import { setConfig } from 'cloudinary-build-url';

import { env } from './env';

const CLOUDINARY_CONFIG = {
  cloudName: env.VITE_CLOUD_NAME,
  apiKey: env.VITE_CLOUDINARY_API_KEY,
};

setConfig(CLOUDINARY_CONFIG);