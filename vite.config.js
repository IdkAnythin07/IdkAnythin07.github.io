import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    chunkSizeWarningLimit: 4000, 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('monaco-editor')) {
              return 'vendor-monaco';
            }
            if (id.includes('@xterm')) {
              return 'vendor-xterm'; 
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            return 'vendor-core'; 
          }
        }
      }
    },
  },
});