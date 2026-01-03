import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        // Frontend dev server
        port: 5174,
        host: true,
        strictPort: true,
      },
      plugins: [react()],
      // Never expose secrets to the browser. Anything injected here is bundled client-side.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
