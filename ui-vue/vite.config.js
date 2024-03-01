import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// vuetify
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    vuetify(),
    ViteFonts({
      google: {
        families: [{
          name: "Roboto",
          styles: "wght@100;300;400;500;700;900",
        }],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        im0: resolve(__dirname, "im0/index.html"),
        im1: resolve(__dirname, "im1/index.html"),
        im2: resolve(__dirname, "im2/index.html"),
        lo1: resolve(__dirname, "lo1/index.html"),
      },
    },
  },

  server: {
    proxy: {
      "/pmims_api/": "http://127.0.0.1:20200",
    },
  },
});
