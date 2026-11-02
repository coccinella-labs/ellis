import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./apps/client/src/test-setup.ts'],
    exclude: ['tests/e2e/**', '**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.*',
        '**/node_modules/**',
        'apps/client/src/components/ui/**',
        'apps/client/src/test-setup.ts',
        'apps/client/src/main.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 60,
        branches: 60,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/client/src'),
      '@shared': path.resolve(__dirname, './packages/shared'),
    },
  },
});
