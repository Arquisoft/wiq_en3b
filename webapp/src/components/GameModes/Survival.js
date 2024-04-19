import Button from '../../components/Button/Button'
import Quiz from '../../components/Quiz/Quiz'
import '../../pages/Game/Game.css'
import { QUESTIONS } from '../../hooks/useGame'
import { useState } from 'react'

function Survival({ goBack }) {
  const [hasFinishedConfiguration, setHasFinishedConfiguration] =
    useState(false)

  return (
    <>
      <div className="quiz-wrapper">
        {!hasFinishedConfiguration && (
          <div className="header-and-buttons-container">
            <h2>Survival mode</h2>
            <p className="quiz-mode-description">
              The Survival mode is just you against the clock. Correct answers
              earn you precious time, but get one wrong, and the clock starts
              ticking faster. How long can you survive?
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
              numberOfQuestions: QUESTIONS.ondemand,
              pointsPerQuestion: 0,
            }}
            goBack={goBack}
          />
        )}
      </div>
    </>
  )
}

export default Survival
