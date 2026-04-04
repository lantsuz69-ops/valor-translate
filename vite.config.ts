import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // השורות שפותרות את בעיית ה-Rollup ב-Vercel:
  build: {
    rollupOptions: {
      external: [], 
    },
  },
  optimizeDeps: {
    include: ['react-to-print'],
  },
})