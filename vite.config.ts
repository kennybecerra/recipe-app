import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3010,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Modern SASS configuration
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
