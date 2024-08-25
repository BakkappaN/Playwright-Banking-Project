// Include playwright module
const { test, expect } = require('@playwright/test');
import BaseTest from '../utils/basetest';
const { HomePage } = require('../pages/homepage');
const { ResultPage } = require('../pages/resultpage');
const { PlaylistPage } = require('../pages/playlistpage');

/**
 * Bakkappa N
 */
test('UI automation test using playwright', { tag: '@UITest' }, async ({ page }) => {

    const baseTest = new BaseTest(page);
    const homepage = new HomePage(page);
    const resultpage = new ResultPage(page);
    const playlistpage = new PlaylistPage(page);

    await test.step('Go to URL', async () => {
        await baseTest.goto();
    });

    await test.step('Search with keywords', async () => {
        await homepage.searchKeywords(baseTest.testData.skill1);
    });

    await test.step('Click on playlist', async () => {
        await resultpage.clickOnPlaylist();
        await page.waitForTimeout(4000);
    });

    await test.step('Click on video', async () => {
        await playlistpage.clickOnVideo();
        await page.waitForTimeout(8000);
    });
})