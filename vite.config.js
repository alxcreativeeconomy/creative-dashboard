import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/creative-dashboard',
  define: {
    __BUILD_DATE__: JSON.stringify(
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    ),
  },
})