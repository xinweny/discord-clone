import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
    ],
    define: {
      'process.env.CLIENT_URL': env.CLIENT_URL,
      'process.env.API_URL': env.API_URL,
      'process.env.CLOUD_NAME': env.CLOUD_NAME,
      'process.env.CLOUDINARY_API_KEY': env.CLOUDINARY_API_KEY,
      'process.env.TENOR_API_KEY': env.TENOR_API_KEY,
      'process.env.LK_URL': env.LK_URL,
    },
    resolve: {
      alias: {
        '@assets': path.join(__dirname, './src/assets'),
        '@styles': path.join(__dirname, './src/assets/styles'),
      },
    },
  };
});

