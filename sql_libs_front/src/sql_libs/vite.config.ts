import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['date-fns-tz'],
    },
  },
});
