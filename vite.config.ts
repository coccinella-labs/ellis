import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'apps/client', 'src'),
      '@shared': path.resolve(import.meta.dirname, 'packages/shared'),
      '@assets': path.resolve(import.meta.dirname, 'attached_assets'),
    },
  },
  root: path.resolve(import.meta.dirname, 'apps/client'),
  publicDir: path.resolve(import.meta.dirname, 'apps/client/public'),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    rollupOptions: {
      input: 'apps/client/index.html',
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
  },
});
