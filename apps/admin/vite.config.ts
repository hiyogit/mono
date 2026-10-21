import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 포트는 package.json 스크립트(--port)에서 지정한다
export default defineConfig({
  plugins: [react()],
});
