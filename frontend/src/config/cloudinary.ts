import { setConfig } from 'cloudinary-build-url';

const CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
};

setConfig(CLOUDINARY_CONFIG);