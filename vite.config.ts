import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      'react/jsx-runtime': resolve(__dirname, 'vendor/mini-react/jsx-runtime.ts'),
      'react/jsx-dev-runtime': resolve(__dirname, 'vendor/mini-react/jsx-dev-runtime.ts'),
      'react-dom/client': resolve(__dirname, 'vendor/mini-react-dom/client.ts'),
      react: resolve(__dirname, 'vendor/mini-react/index.ts'),
    },
  },
});
