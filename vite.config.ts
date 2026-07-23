import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at victorpioli.github.io/devClub/, not
  // at the domain root, so every built asset URL needs this prefix.
  base: '/devClub/',
  plugins: [react()],
})
