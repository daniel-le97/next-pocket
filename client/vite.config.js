import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../pocketbase/static',
    sourcemap: false
  },
  server: {
    port: 3000
  }
})
