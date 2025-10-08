import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 2025,
    host : true,
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        secure: false
      },
    },
  },
})
