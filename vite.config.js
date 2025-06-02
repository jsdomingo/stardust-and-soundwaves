import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    host: env.VITE_SPOTIFY_REDIRECT_URI?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
});
