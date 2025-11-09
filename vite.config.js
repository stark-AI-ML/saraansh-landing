import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    open: true
  },
  css: {
    devSourcemap: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})