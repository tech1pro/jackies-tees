import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Baked into the bundle at build time (no trailing slash).
// Render sets RENDER_EXTERNAL_URL during CI builds — works without manual env for default *.onrender.com URLs.
const siteOrigin =
  process.env.RENDER_EXTERNAL_URL?.replace(/\/$/, '') ||
  process.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  '';

export default defineConfig({
  define: {
    __JT_SITE_ORIGIN__: JSON.stringify(siteOrigin),
  },
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
