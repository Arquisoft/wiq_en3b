const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');
const {
  waitForWelcomeMessage,
  switchFromLoginPageToRegisterPageByUsingLink,
  registerUser,
  waitForUserAlreadyRegisteredError
} = require('./register-form.utils')

let page;
let browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = await puppeteer.launch({ slowMo: 10, ignoreHTTPSErrors: true })
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("https://localhost", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user is not registered in the site', ({ given, when, then }) => {

    let username;
    let password;

    given('An unregistered user', async () => {
      username = "kawuser-register"
      password = "kawpass123@"
      await switchFromLoginPageToRegisterPageByUsingLink(page)
    });

    when('I fill the data in the form and press submit', async () => {
      await registerUser(page, username, password);
    });

    then('A confirmation message should be shown in the screen', async () => {
      await waitForWelcomeMessage(page, username)
    });
  })

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });

    await page
      .goto("https://localhost", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user is already registered in the site', ({ given, when, then }) => {

    let username;
    let password;

    given('An already registered user', async () => {
      username = "kawuser-register"
      password = "kawpass123@"
      await switchFromLoginPageToRegisterPageByUsingLink(page)
    });

    when('I fill the data in the form and press submit', async () => {
      await registerUser(page, username, password);
    });

    then('An error message should be shown in the screen', async () => {
      await waitForUserAlreadyRegisteredError(page, username)
    });
  })

  afterAll(async () => {
    browser.close()
  })

});