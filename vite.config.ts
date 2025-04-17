/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  envDir: './src/env',
  test: {
    testTimeout: 500_000,
    hookTimeout: 1000_000
  }
})
