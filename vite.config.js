import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-icons',
      'react-type-animation',
      'react-scroll-parallax'
    ]
  },
  server: {
    port: 5173,
    strictPort: false,
    hmr: { timeout: 20000 },
  },
})
