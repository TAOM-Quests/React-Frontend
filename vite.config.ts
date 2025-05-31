/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  envDir: './src/env',
  server: {
   port: 8000,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:8000",
  },
  preview: {
   port: 8000,
   strictPort: true,
  },
  css:{
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
})
