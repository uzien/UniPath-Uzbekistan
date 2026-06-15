import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: [
          '**/custom_universities.json',
          '**/pending_requests.json',
          '**/universities.json',
          path.resolve(__dirname, 'custom_universities.json'),
          path.resolve(__dirname, 'pending_requests.json'),
          path.resolve(__dirname, 'universities.json')
        ]
      }
    },
  };
});
