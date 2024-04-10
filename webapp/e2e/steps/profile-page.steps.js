const puppeteer = require('puppeteer')
const { defineFeature, loadFeature } = require('jest-cucumber')
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/profile-page.feature')
const { loginUser, registerAUser } = require('./login-form.utils')
const {
  waitForProfileElement,
  fillBiography,
  changeProfileImage,
  waitForProfileUpdated,
} = require('./profile-page.utils')
const { selectNavOptionByHref } = require('./utils')

let page
let browser

defineFeature(feature, test => {
  const username = 'kawuser-profile'
  const password = 'kawpass123@'
  const bioToBeWritten = 'Testing that the profile updates for kawuser'
  const imageToBeSelected = 'elephant'

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 10 })
    page = await browser.newPage()

    setDefaultOptions({ timeout: 10000 })

    await page
      .goto('http://localhost:80', {
        waitUntil: 'networkidle0',
      })
      .catch(() => { })

    await registerAUser(username, password)
  })

  test('User updates profile information', ({ given, when, then, and }) => {
    given('The user is logged in', async () => {
      await loginUser(page, username, password)
    })

    when('The user navigates to the profile page', async () => {
      await selectNavOptionByHref(page, '/profile')
    })

    then("The user's profile information should be displayed", async () => {
      await waitForProfileElement(page, username)
    })

    when('The user updates the biography text', async () => {
      await fillBiography(page, bioToBeWritten)
    })

    and('The user changes the profile image', async () => {
      await changeProfileImage(page, imageToBeSelected)
    })

    then('The profile should be updated with the new information', async () => {
      await waitForProfileElement(page, username)
      await waitForProfileUpdated(page, bioToBeWritten, imageToBeSelected)
    })
  })

  afterAll(async () => {
    browser.close()
  })
})
