const puppeteer = require('puppeteer')
const { defineFeature, loadFeature } = require('jest-cucumber')
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/start-game.feature')
const { loginUser, registerAUser } = require('./login-form.utils')
const { selectNavOptionByHref } = require('./utils')
const {
  clickOnGameDifficulty,
  waitForQuizToAppear,
} = require('./game-page.utils')

let browser
let page

const USER = 'kawuser-game'
const PASS = 'kawpass123@'

defineFeature(feature, test => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ slowMo: 10, ignoreHTTPSErrors: true })
    page = await browser.newPage()
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto('https://localhost', {
        waitUntil: 'networkidle0',
      })
      .catch(() => { })

    await registerAUser(USER, PASS)
  })

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear()
    })

    await page
      .goto('https://localhost', {
        waitUntil: 'networkidle0',
      })
      .catch(() => { })
  })

  test('The user wants to go to the game menu', ({ given, when, then }) => {
    given('A logged user', async () => {
      await loginUser(page, USER, PASS)
    })

    when('The user navigates to the game page', async () => {
      await selectNavOptionByHref(page, '/game')
    })

    then('The two gamemodes should appear', async () => {
      const buttonContainer = await page.$('.button-container') // document.quesrySelector
      const buttons = await buttonContainer.$$('button') // document.quesrySelectorAll

      expect(buttons.length).toBe(2)
    })
  })
  test('The user wants to start an easy game', ({ given, when, and, then }) => {
    given('A logged user', async () => {
      await loginUser(page, USER, PASS)
    })

    when('The user navigates to the game page', async () => {
      await selectNavOptionByHref(page, '/game')
    })

    and('The user press the Classic button', async () => {
      await clickOnGameDifficulty(page, 'Classic')
    })

    and('The user press the Easy button', async () => {
      await clickOnGameDifficulty(page, 'Easy')
    })

    then('The quiz game should begin', async () => {
      await waitForQuizToAppear(page)
    })
  })

  test('The user wants to start a medium game', ({
    given,
    when,
    and,
    then,
  }) => {
    given('A logged user', async () => {
      await loginUser(page, USER, PASS)
    })

    when('The user navigates to the game page', async () => {
      await selectNavOptionByHref(page, '/game')
    })

    and('The user press the Classic button', async () => {
        await clickOnGameDifficulty(page, 'Classic')
    })

    and('The user press the Medium button', async () => {
      await clickOnGameDifficulty(page, 'Medium')
    })

    then('The quiz game should begin', async () => {
      await waitForQuizToAppear(page)
    })
  })

  test('The user wants to start a hard game', ({ given, when, and, then }) => {
    given('A logged user', async () => {
      await loginUser(page, USER, PASS)
    })

    when('The user navigates to the game page', async () => {
      await selectNavOptionByHref(page, '/game')
    })

    and('The user press the Classic button', async () => {
        await clickOnGameDifficulty(page, 'Classic')
    })

    and('The user press the Hard button', async () => {
      await clickOnGameDifficulty(page, 'Hard')
    })

    then('The quiz game should begin', async () => {
      await waitForQuizToAppear(page)
    })
  })

  afterAll(async () => {
    browser.close()
  })
})
