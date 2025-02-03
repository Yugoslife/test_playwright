import { test, expect } from '@playwright/test';

test.describe('Подписка на рассылку', () => {
    test('Успешная подписка с валидным email', async ({ page }) => {
        await page.goto('https://novayagazeta.eu/');

        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.mouse.move(120, 120);

        await page.waitForSelector('.fc-button.fc-cta-consent');
        await page.click('.fc-button.fc-cta-consent');
        await page.mouse.move(100, 100);

        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.fill('input.HeLGU', 'test@example.com');

        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        await page.click('button.yzh5S');

        await page.evaluate(() => window.scrollBy(1, document.body.scrollHeight));
        await expect(page.locator('h3.DILQV')).toHaveText('Спасибо!');
        await expect(page.locator('p.WO2om')).toHaveText('Мы будем сообщать вам только о самом важном');
    });

});
