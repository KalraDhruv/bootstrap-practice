import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // ------------------------------------------------------------------
  // FIX: Explicitly define process.env.NODE_ENV for browser environment
  // ------------------------------------------------------------------
  define: {
    // This replaces all occurrences of process.env.NODE_ENV with the string 'production'
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  // ------------------------------------------------------------------
  build: {
    // Output folder relative to star-project/
    outDir: 'dist', 
    lib: {
      // The entry file of your bundle
      entry: path.resolve(__dirname, 'src/main.jsx'),
      // The name of the global variable if you used it as a UMD/IIFE bundle
      name: 'StarsCanvasBundle',
      // The name of the final output file
      fileName: (format) => `stars-bundle.js`,
      formats: ['umd'], // 'umd' is a reliable format for plain script tags
    },
    // Keep this true for a small production bundle
    minify: true, 
    rollupOptions: {
      external: [],
    },
  },
});
