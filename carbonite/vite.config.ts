import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// The site is served from playground.jodyferry.com/carbonite
export default defineConfig({
  base: "/carbonite/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist/carbonite", emptyOutDir: true, chunkSizeWarningLimit: 900 },
})
