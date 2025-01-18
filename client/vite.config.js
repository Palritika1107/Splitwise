import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server :{
  //   port : 3000,
  // },
  build: {
    sourcemap: true, // Enable source maps for debugging
  },
  server: {
    port: 5173, // Ensure the port matches your setup
  },
})
