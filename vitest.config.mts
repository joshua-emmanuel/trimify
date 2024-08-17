import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    // exclude: [
    //   '**/node_modules/**',
    //   '**/*.{test,spec}.?(c|m)[jt]s?(x)',
    //   '**/*.{idea,git,cache,output,temp}/**',
    //   '**/*.{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    // ],
    environment: 'jsdom',
    globals: true,
  },
});
