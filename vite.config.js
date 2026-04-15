import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'nt'),
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'nt'),
    },
  },
});
