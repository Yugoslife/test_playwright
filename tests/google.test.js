import { test, expect } from '@playwright/test';

test('Поиск в Google', async ({ page }) => {
    await page.goto('https://www.google.com');

    // Принимаем cookies
  // Ищем кнопку "Принять все"
const acceptCookies = page.locator('button:has-text("Принять все")'); 

if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
}

const acceptCookiess = page.locator('button:has-text("Принять все")'); 

if (await acceptCookiess.isVisible()) {
    await acceptCookiess.click();
}


    // Кликаем в строку поиска (если Playwright потерял фокус)
    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.click();  
    await searchBox.fill('Playwright');
    await page.keyboard.press('Enter');

    // Ждем появления результатов
    await page.waitForSelector('[role="main"]', { timeout: 60000 });

    // Проверяем, что есть результаты
    const results = await page.locator('h3');
    await expect(results.first()).toBeVisible();
});

