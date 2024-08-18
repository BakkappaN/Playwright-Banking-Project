// Include playwright module
const { test, expect } = require('@playwright/test');
import path from "node:path";

const { RegistrationPage } = require('../pages/registrationpage');
const { LoginPage } = require('../pages/loginpage');
const { ParaBankHomePage } = require('../pages/parabankhomepage');
const { OpenNewAccountPage } = require('../pages/opennewaccountpage');

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
    const loginPage = new LoginPage(page);

    const newUserName = pbanktestdata.firstname + "_" + pbanktestdata.lastname + "_" + faker.number.int(10000);

    await test.step('Open browser with Para Bank URL', async () => {
        await loginPage.goto();
    });

    await test.step('Go to new user registration page', async () => {
        await loginPage.clickOnRegisterLink();
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

/**
 * Bakkappa N
 */
test('Verify that user is able to login successfully in the ParaBank application after providing the valid username and password', { tag: '@ParaBankTest' }, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open browser with Para Bank URL', async () => {
        await loginPage.goto();
    });

    await test.step('Login into application', async () => {
        await loginPage.loginToApplication();
    });

    await test.step('Verify that user is able to login successfully', async () => {
        await expect(page.locator('#leftPanel')).toContainText('Welcome Testers Talk');
    });
});

/**
 * Bakkappa N
 */
test('Verify that user can see the Account types in dropdown', { tag: '@ParaBankTest' }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const paraBankHomePage = new ParaBankHomePage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);

    await test.step('Open browser with Para Bank URL', async () => {
        await loginPage.goto();
    });

    await test.step('Login into application', async () => {
        await loginPage.loginToApplication(runtimetestdata.username, pbanktestdata.password);
    });

    await test.step('Verify that account types options are available', async () => {
        await paraBankHomePage.clickOnOpenNewAccountLink();
        await expect(openNewAccountPage.accountType).toBeVisible();

        //await openNewAccountPage.createNewAccount(pbanktestdata.savings);
        //await openNewAccountPage.getAccountNumber();
        //await expect(page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.');
        //console.log('Newly created account number is : '+ await openNewAccountPage.getAccountNumber());
    });
});

/**
 * Bakkappa N
 */
test('Verify that user is not able to login into application when user entered invalid userid', { tag: '@ParaBankTest' }, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open browser with Para Bank URL', async () => {
        await loginPage.goto();
    });

    await test.step('Login into application', async () => {
        await loginPage.loginToApplication("adsfga", pbanktestdata.password);
    });

    await test.step('Verify login error message', async () => {
        await expect(page.locator('#rightPanel')).toContainText('The username and password could not be verified.');
    });
});