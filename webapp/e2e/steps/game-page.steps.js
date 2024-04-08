const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/start-game.feature');
const { loginUser, registerAUser } = require('./login-form.utils')
const { selectNavOptionByHref } = require('./utils')

let browser;
let page;

const USER = "kawuser-game";
const PASS = "kawpass123@"


/* MORE TESTS TO ADD
Scenario: The user wants to start an easy game
  Given A logged user
  When The user navigates to the game page
  And The user press the Easy button
  Then The first question to answer should appear

Scenario: The user wants to start a medium game
  Given A logged user
  When The user navigates to the game page
  And The user press the Medium button
  Then The first question to answer should appear

Scenario: The user wants to start a hard game
  Given A logged user
  When The user navigates to the game page
  And The user press the Hard button
  Then The first question to answer should appear
  */


defineFeature(feature, test => {

    beforeAll(async () => {
        
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false, slowMo: 10 });
        page = await browser.newPage();

        setDefaultOptions({ timeout: 10000 })

        await page.goto("http://localhost:3000",{
            waitUntil: "networkidle0"
        }).catch(() => {});
        
        await registerAUser(USER,PASS);
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

    test("The user wants to go to the game menu", ({ given,when,then }) => {

        given("A logged user", async () => {
            await loginUser(page,USER,PASS)
        });

        when("The user navigates to the game page", async () => {
            await selectNavOptionByHref(page, "/game")
        });

        then("The three possible difficulties should appear", async () => {
            const buttonContainer = await page.$('.button-container');
            const buttons = await buttonContainer.$$('button')

            expect(buttons.length).toBe(3)
        });


    })

    afterAll(async ()=>{
        browser.close()
    })

});
