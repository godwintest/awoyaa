import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/awoyaa/", // Replace 'erp-software-website' with your actual repository name
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
