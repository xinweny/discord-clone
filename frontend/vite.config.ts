import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        '@assets': path.join(__dirname, './src/assets'),
        '@styles': path.join(__dirname, './src/assets/styles'),
      },
    },
  };
});

