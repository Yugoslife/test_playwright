import { test, expect } from '@playwright/test';

test('Проверка заголовка сайта Example.com', async ({ page }) => {
  await page.goto('https://example.com');       // Переходим на сайт
  await expect(page).toHaveTitle('Example Domain'); // Проверяем заголовок страницы
});
