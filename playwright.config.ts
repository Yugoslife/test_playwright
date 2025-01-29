import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true, // Запуск с UI
    locale: 'ru-RU', // Язык браузера
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
  },
});
