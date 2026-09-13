import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
  },
  // server: {
  //   host: true,
  //   origin: 'https://a5edd1d013d7.ngrok-free.app',
  // },
  server: {
    allowedHosts: [
      'upper-simpson-temporary-representative.trycloudflare.com'
    ],
  },
  preview: {
    allowedHosts: ['upper-simpson-temporary-representative.trycloudflare.com']
  }
})
