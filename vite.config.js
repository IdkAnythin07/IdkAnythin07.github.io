import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        playground: resolve(__dirname, "pages/playground.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        secret: resolve(__dirname, "pages/secret.html"),
        piracy: resolve(__dirname, "pages/piracy.html"),
      },
    },
  },
});
