import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': loadEnv(process.env.NODE_ENV, process.cwd(), ''),
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, './src/assets'),
    },
  },
});
