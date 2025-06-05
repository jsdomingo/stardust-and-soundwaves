import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), mkcert()],
    server: {
      https: true,
      host: env.VITE_SPOTIFY_URI,
      port: 5173, 
    },
    host: 'REPLACE_YOUR_URI_HERE'
  };
});
