import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
    }),
    tsconfigPaths(),
  ],
  define: {
    'process.env': loadEnv(process.env.NODE_ENV, process.cwd(), ''),
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, './src/assets'),
      '@styles': path.join(__dirname, './src/assets/styles'),
    },
  },
});
