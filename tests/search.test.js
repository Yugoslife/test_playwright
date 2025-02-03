import { test, expect } from '@playwright/test';

test('Поиск по сайту', async ({ page }) => {
    // Открываем главную страницу
    await page.goto('https://novayagazeta.eu/');

    // Кликаем по иконке поиска (ссылка)
    await page.locator('a[title="Поиск"]').click();

    // Дожидаемся перехода на страницу поиска
    await page.waitForURL('**/search');

    // Вводим поисковый запрос в строку поиска
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill('Украина');

    // Подтверждаем поиск нажатием Enter
    await searchInput.press('Enter');

    // Дожидаемся появления результатов
    await page.waitForSelector('.search-results', { timeout: 60000 });


    // Проверяем, что результаты поиска появились
    const results = page.locator('.search-results');
    await expect(results).toBeVisible();
});
