import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      "/user-api": "http://localhost:5000",
      "/admin-api": "http://localhost:5000",
      "/manager-api": "http://localhost:5000"
    }
  },
  
})
