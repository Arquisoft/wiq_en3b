const axios = require('axios')

async function loginUser(page, username, password) {
  await expect(page).toFill('input[name="username"]', username)
  await expect(page).toFill('input[name="password"]', password)
  await expect(page).toClick('button', { text: 'Login' })
}

async function waitForInvalidCredentialsError(page) {
  await expect(page).toMatchElement('.response-error', {
    text: 'Invalid credentials',
  })
}

async function registerAUser(username, password) {
  await axios.post('https://localhost:8000/adduser', {
    username,
    password,
  })
}

module.exports = { loginUser, waitForInvalidCredentialsError, registerAUser }
