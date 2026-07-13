import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    // Bump the limit specifically to accommodate Monaco's massive engine
    chunkSizeWarningLimit: 4000, 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        playground: resolve(__dirname, "pages/playground.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        secret: resolve(__dirname, "pages/secret.html"),
        piracy: resolve(__dirname, "pages/piracy.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Quarantine Monaco into its own isolated file
            if (id.includes('monaco-editor')) {
              return 'vendor-monaco';
            }
            // Isolate the terminal 
            if (id.includes('@xterm')) {
              return 'vendor-xterm'; 
            }
            // Group everything else
            return 'vendor-core'; 
          }
        }
      }
    },
  },
});