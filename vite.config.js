import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contentful': {
        target: 'https://cdn.contentful.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contentful/, ''),
      },
    },
  },
})