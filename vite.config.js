import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on GitHub Pages under /faraz-ahmad-portfolio/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
