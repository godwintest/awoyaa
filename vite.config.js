import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/awoyaa/", // Replace 'erp-software-website' with your actual repository name
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // New Fix Solution
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        blog: resolve(__dirname, "blog.html"),
        careers: resolve(__dirname, "careers.html"),
        contact: resolve(__dirname, "contact.html"),
        documentation: resolve(__dirname, "documentation.html"),
        faq: resolve(__dirname, "faq.html"),
        features: resolve(__dirname, "features.html"),
        pricing: resolve(__dirname, "pricing.html"),
        privacy: resolve(__dirname, "privacy.html"),
        terms: resolve(__dirname, "terms.html"),
      },
    },

    // // New Routing Fix From GPT
    // rollupOptions: {
    //   input: {
    //     main: "index.html",
    //     fallback: "404.html",
    //   },
    // },
  },
});
