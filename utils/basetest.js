// Inlcude playwright module
const { test, expect } = require('@playwright/test');

import { qaTestData } from "../test-data/qa/google.json";
import { stageTestData } from "../test-data/stage/google.json";

// create base class
class BaseTest {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {

        // Init page object
        this.page = page;

        if (process.env.ENV == 'qa') {
            this.testData = qaTestData;
        } else {
            this.testData = stageTestData;
        }
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 })
        await this.page.goto('https://www.google.com');
    }
}
export default BaseTest;