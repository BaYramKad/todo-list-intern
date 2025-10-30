import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // чтобы писать тесты без импорта expect, describe и т.п.
    environment: 'jsdom', // браузерное окружение для тестов
    setupFiles: './setupTests.ts', // файл с настройками для тестов (например, jest-dom)
    include: ['tests/**/*.test.tsx', 'tests/**/*.test.ts'], // где искать тесты
    coverage: {
      reporter: ['text', 'json', 'html'], // отчёты покрытия кода (по желанию)
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
