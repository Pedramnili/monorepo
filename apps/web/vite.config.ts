import {defineConfig} from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
