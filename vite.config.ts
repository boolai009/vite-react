import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Add Unity WebGL support
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },

  // Ensure Unity files are served correctly
  assetsInclude: ['**/*.gz', '**/*.wasm', '**/*.data', '**/*.framework.js'],

  build: {
    // Handle large Unity files
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  
  // Help with TypeScript path resolution
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})