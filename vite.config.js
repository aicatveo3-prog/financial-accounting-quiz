import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works on any GitHub Pages subpath
  // (https://<user>.github.io/<repo>/) without hardcoding the repo name.
  // Safe here because the app has no client-side routing.
  base: './',
  plugins: [react()],
})
