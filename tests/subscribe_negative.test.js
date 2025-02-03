import { test, expect } from '@playwright/test';

test.describe('Негативное тестирование подписки', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://novayagazeta.eu/');
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.waitForSelector('.fc-button.fc-cta-consent');
        await page.click('.fc-button.fc-cta-consent');
    });

    test('Ошибка при пустом email', async ({ page }) => {
        await page.click('button.yzh5S');
        await expect(page.locator('.error-message')).toHaveText('Введите email');
    });

    test('Ошибка при невалидном email', async ({ page }) => {
        await page.goto('https://novayagazeta.eu/');
        await page.fill('input.HeLGU', ':::@gmail.com');
        await page.click('button.yzh5S');
        
        // Получаем текст встроенного сообщения об ошибке браузера
        const errorMessage = await page.locator('input.HeLGU').evaluate(el => el.validationMessage);
        console.log('Сообщение ошибки:', errorMessage);
    
        // Проверяем, что ошибка содержит ожидаемый текст
        expect(errorMessage).toContain("should not contain the symbol");
    });
    

    test('Ошибка при слишком длинном email', async ({ page }) => {
        const longEmail = 'a'.repeat(300) + '@mail.com';
        await page.fill('input.HeLGU', longEmail);
        await page.click('button.yzh5S');
        await expect(page.locator('.error-message')).toHaveText('Слишком длинный email');
    });

    test('Ошибка при email без @', async ({ page }) => {
        await page.fill('input.HeLGU', 'usermail.com');
        await page.click('button.yzh5S');
        await expect(page.locator('.error-message')).toHaveText('Некорректный email');
    });

    test('Ошибка при email с запрещенными символами', async ({ page }) => {
        await page.fill('input.HeLGU', "user!#$%&'*+/=?^_`{|}~@mail.com");
        await page.click('button.yzh5S');
        await expect(page.locator('.error-message')).toHaveText('Некорректный email');
    });

    test('Повторная подписка на тот же email', async ({ page }) => {
        await page.fill('input.HeLGU', 'test@example.com');
        await page.click('button.yzh5S');
        await expect(page.locator('h3.DILQV')).toHaveText('Спасибо!');

        // Попробуем подписаться снова
        await page.fill('input.HeLGU', 'test@example.com');
        await page.click('button.yzh5S');

        // Проверяем сообщение об ошибке
        await expect(page.locator('.error-message')).toHaveText('Вы уже подписаны');
    });
});
