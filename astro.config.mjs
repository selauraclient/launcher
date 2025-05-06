import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    clearScreen: false,
    server: {
      strictPort: true,
    },
    envPrefix: ["ASTRO_", "VITE_", "TAURI_"],
    build: {
      // Tauri supports ES2021
      target: ["es2021", "chrome100", "safari13"],
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  },
})
