import { setConfig } from 'cloudinary-build-url';

const CLOUDINARY_CONFIG = {
  cloudName: process.env.VITE_CLOUD_NAME,
  apiKey: process.env.VITE_CLOUDINARY_API_KEY,
};

setConfig(CLOUDINARY_CONFIG);