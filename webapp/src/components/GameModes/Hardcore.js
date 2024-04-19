import Button from '../Button/Button'
import Quiz from '../Quiz/Quiz'
import '../../pages/Game/Game.css'
import { useState } from 'react'

function Hardcore({ goBack }) {
  const [hasFinishedConfiguration, setHasFinishedConfiguration] =
    useState(false)

  return (
    <>
      <div className="quiz-wrapper">
        {!hasFinishedConfiguration && (
          <div className="header-and-buttons-container">
            <h2>Hardcore mode</h2>
            <p className="quiz-mode-description">
              In the Hardcore mode there is no room for error. You must answer
              every question correctly, one after another, to stay in the game.
              Test your knowledge, nerve, and focus as you strive for
              perfection. Can you conquer the challenge and emerge as the
              ultimate quiz master?
            </p>
            <div className="button-container">
              <Button
                onClick={() => {
                  setHasFinishedConfiguration(true)
                }}
              >
                Start
              </Button>
              <Button onClick={goBack} className="danger">
                Go back
              </Button>
            </div>
          </div>
        )}
        {hasFinishedConfiguration && (
          <Quiz
            configuration={{
              numberOfQuestions: 0,
              pointsPerQuestion: 10,
              timePerQuestion: 10,
            }}
            goBack={goBack}
          />
        )}
      </div>
    </>
  )
}

export default Hardcore
