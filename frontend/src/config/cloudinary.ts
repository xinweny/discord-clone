import { setConfig } from 'cloudinary-build-url';

const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUD_NAME,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
};

setConfig(CLOUDINARY_CONFIG);