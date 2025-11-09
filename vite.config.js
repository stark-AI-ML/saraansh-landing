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
        main: './index.html',
        onboard: './onboard.html'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth']
  }
})