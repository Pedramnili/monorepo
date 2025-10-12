import {defineConfig} from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server : {
    port : 2025,
    host : true,
    proxy: {
      "/api": {
        target      : "http://localhost:5000/",
        changeOrigin: true,
        secure      : false
      },
    },
  },
})
