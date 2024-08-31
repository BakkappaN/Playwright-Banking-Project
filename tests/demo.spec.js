// Include playwright module
const { test, expect } = require('@playwright/test');

import { writeTestStatusToExcelFile } from '../utils/excelhandler';

test.afterEach('Running after each test...', async ({ page }, testInfo) => {
    if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
        await writeTestStatusToExcelFile(testInfo);
    } else {
    }
});

test('[2] testcase1', async ({ page, request }) => {
    console.log('test is running');
});

test('[9,12] testcase2 @test1', async ({ page }) => {
    console.log('test is running');
});

test('[14] testcase3', async ({ page }) => {
    expect(true).toBe(false);
});