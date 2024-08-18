// Include playwright module
const { test, expect } = require('@playwright/test');

import path from "node:path";

const { RegistrationPage } = require('../pages/registrationpage');
import { pbanktestdata } from "../test-data/qa/parabank.json";
import { runtimetestdata } from '../test-data/runtimetestdata.json'
import { qaTestData } from "../test-data/qa/google.json";
import { stageTestData } from "../test-data/stage/google.json";
import { faker } from "@faker-js/faker";

import { updateJsonFile } from '../utils/helper';

const filePath = path.join(__dirname, "../test-data/runtimetestdata.json");

let testData = null;

test.beforeAll('Running before all tests', () => {
    if (process.env.ENV == 'qa') {
        testData = qaTestData;
    } else {
        testData = stageTestData;
    }
})

/**
 * Bakkappa N
 */
test('Automate User Registration process', { tag: '@ParaBankTest' }, async ({ page }) => {

    const registrationPage = new RegistrationPage(page);
    const newUserName = pbanktestdata.firstname + "_" + pbanktestdata.lastname + "_" + faker.number.int(10000);

    await test.step('Open parabank registration page', async () => {
        await registrationPage.goto();
    });

    await test.step('Register new user', async () => {
        await registrationPage.registerNewUser(pbanktestdata.firstname,
            pbanktestdata.lastname, pbanktestdata.address,
            pbanktestdata.city, pbanktestdata.state, pbanktestdata.zipcode,
            pbanktestdata.phonenumber, pbanktestdata.ssn, newUserName,
            pbanktestdata.password
        );
        await updateJsonFile(filePath, "username", newUserName);
    });

    await test.step('Verify that account is created successfully', async () => {
        await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
    });

    await test.step('Verify that user is logged in successfully', async () => {
        await expect(page.locator('h1')).toContainText('Welcome ' + newUserName);
    });
    console.log('Username is : ' + runtimetestdata.username);
    console.log('Password is : ' + pbanktestdata.password);
})