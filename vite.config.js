import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: true
  },
  css: {
    // This ensures CSS opacity and transitions work correctly
    devSourcemap: true
  }
})