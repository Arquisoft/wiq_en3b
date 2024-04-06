const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 10 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "kawuser"
      password = "kawpass123@"
      await expect(page).toClick("a", { text: "Not yet registered? Register Now" });
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="repeatPassword"]', password);
      await expect(page).toClick('button', { text: 'Register' })
    });

    then('A confirmation message should be shown in the screen', async () => {
        await expect(page).toMatchElement('.welcome-message', { text: 'Welcome back,' });
        await expect(page).toMatchElement('.welcome-message .username', { text: username });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});