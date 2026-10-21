import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PORT } from '@mono/consts';

export default defineConfig({
  plugins: [react()],
  server: { port: PORT.ADMIN, strictPort: true },
  preview: { port: PORT.ADMIN, strictPort: true },
});
