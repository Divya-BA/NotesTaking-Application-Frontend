import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: { // https => http://localhost:3000 | http => http://localhost:3000
  //     maxSessionMemory: 100
  //   }
  // }
})
