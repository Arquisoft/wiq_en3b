async function selectNavOptionByHref(page, hrefValue) {
  await page.click('div.header-button');
  await page.waitForSelector(`a.nav-link[href="${hrefValue}"]`, { visible: true });
  await page.click(`a.nav-link[href="${hrefValue}"]`);
  await page.click('div.close-button');
}


module.exports = { selectNavOptionByHref }
