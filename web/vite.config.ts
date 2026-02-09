import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/bizdev/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/koi': {
        target: 'http://localhost:8301',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/koi/, ''),
      },
    },
  },
})
