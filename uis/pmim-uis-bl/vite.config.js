import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// vuetify
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    vuetify(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "PmimUisBl",
      fileName: "pmim-uis-bl",
      formats: ["es"],
    },
    rollupOptions: {},
  },
});
