import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('ProcessSlider') || id.includes('ThirdBrain') || id.includes('Mandate')) {
            return 'sections-heavy';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
