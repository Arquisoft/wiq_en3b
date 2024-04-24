async function waitForProfileElement(page, username) {
  await expect(page).toMatchElement('h1', {
    text: `Profile of ${username}`,
  })
}

async function fillBiography(page, biography) {
  await expect(page).toFill('textarea.bio-textarea', biography)
}

async function changeProfileImage(page, altText) {
  await page.click('.profile-header img')
  await page.waitForSelector('.profile-images')
  await page.click(`.profile-images img[alt="${altText}"]`)
}

async function waitForProfileUpdated(page, bio, image) {
  await expect(page).toMatchElement('textarea.bio-textarea', {
    text: bio,
  })

  const src = await page.$eval('.profile-header img', img => img.src)

  await expect(src).toContain(image)
}

module.exports = {
  waitForProfileElement,
  fillBiography,
  changeProfileImage,
  waitForProfileUpdated,
}
