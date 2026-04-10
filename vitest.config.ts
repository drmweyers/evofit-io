import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/lib/blog/**', 'src/components/blog/**', 'src/app/blog/**'],
      exclude: ['**/*.test.*', '**/__fixtures__/**', '**/__mocks__/**'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/image': path.resolve(__dirname, './src/__mocks__/next-image.tsx'),
      'next/link': path.resolve(__dirname, './src/__mocks__/next-link.tsx'),
    },
  },
});
