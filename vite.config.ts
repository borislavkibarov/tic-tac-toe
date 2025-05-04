import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@controllers": path.resolve(__dirname, "./src/controllers"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
  root: '.',
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
});
