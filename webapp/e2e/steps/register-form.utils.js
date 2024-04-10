async function registerUser(page, username, password) {
  await expect(page).toFill('input[name="username"]', username)
  await expect(page).toFill('input[name="password"]', password)
  await expect(page).toFill('input[name="repeatPassword"]', password)
  await expect(page).toClick('button', { text: 'Register' })
}

async function waitForWelcomeMessage(page, username) {
  await expect(page).toMatchElement('.welcome-message', {
    text: 'Welcome back,',
  })

  await expect(page).toMatchElement('.welcome-message .username', {
    text: username,
  })
}

async function switchFromLoginPageToRegisterPageByUsingLink(page) {
  await expect(page).toClick('a', { text: 'Not yet registered? Register Now' })
}

async function waitForUserAlreadyRegisteredError(page, username) {
  await expect(page).toMatchElement('.response-error', {
    text: `There is already a user called "${username}" registered in the system`,
  })
}

module.exports = {
  waitForWelcomeMessage,
  switchFromLoginPageToRegisterPageByUsingLink,
  registerUser,
  waitForUserAlreadyRegisteredError,
}
