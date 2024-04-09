async function clickOnGameDifficulty(page, difficulty){
    await page.click('button.button',{
        text: difficulty
    }) 
}

async function waitForQuizToAppear(page){
    await expect(page).toMatchElement('div.quiz')
}

module.exports = { clickOnGameDifficulty, waitForQuizToAppear }