const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');
const { waitForWelcomeMessage } = require('./register-form.utils')
const { loginUser, waitForInvalidCredentialsError, registerAUser } = require('./login-form.utils')

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ slowMo: 10 })
    page = await browser.newPage();

    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await registerAUser("kawuser-login", "kawpass123@")
  });

  test('Registered user logs in successfully', ({ given,when,then }) => {
    
    let username;
    let password;

    given('A registered user', async () => {
        username = "kawuser-login"
        password = "kawpass123@"
    });

    when('I fill the data in the form and press submit', async () => {
        await loginUser(page, username, password);
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
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Registered user logs in with incorrect password', ({ given,when,then }) => {
    
    let username;
    let password;

    given('A registered user', async () => {
        username = "kawuser-login"
        password = "kawpasswrong"
    });

    when('I fill the data in the form with wrong password and press submit', async () => {
        await loginUser(page, username, password);
    });

    then('An error message is displayed', async () => {
        await waitForInvalidCredentialsError(page)
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});