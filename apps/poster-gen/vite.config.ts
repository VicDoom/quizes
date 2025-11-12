/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/poster-gen",
  server: {
    port: 4201,
    host: "localhost",
  },
  preview: {
    port: 4201,
    host: "localhost",
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  resolve: {
    alias: {
      '@components': join(__dirname, 'src/components'),
      '@store': join(__dirname, 'src/store'),
      '@': join(__dirname, 'src'),
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
