import Quiz from '../../components/Quiz/Quiz'
import Button from '../../components/Button/Button'

import '../../pages/Game/Game.css'
import './Custom.css'
import { useState } from 'react'

const DEFAULT_TIME = 15
const DEFAULT_NUMBER_OF_QUESTIONS = 10

const Custom = ({ goBack }) => {
  const [hasFinishedConfiguration, setHasFinishedConfiguration] =
    useState(false)
  const [timeInSeconds, setTimeInSeconds] = useState(DEFAULT_TIME)
  const [numOfQuestions, setNumOfQuestions] = useState(
    DEFAULT_NUMBER_OF_QUESTIONS
  )

  const handleTimeChange = e => {
    setTimeInSeconds(e.target.value)
  }

  const handleNumOfQuestionsChange = e => {
    setNumOfQuestions(e.target.value)
  }

  return (
    <>
      <div className="quiz-wrapper">
        {!hasFinishedConfiguration && (
          <div className="header-and-buttons-container">
            <h2>Configure your game</h2>
            <p className="quiz-mode-description">
              This is the Custom mode. Take control of your quiz experience. Set
              the number of questions, time per question, and select your
              preferred question types. Tailor the challenge to your liking and
              dive into a personalized trivia adventure.
            </p>
            <div className="custom-option">
              <label htmlFor="timeSlider">Time (Seconds)</label>
              <input
                type="range"
                id="timeSlider"
                min={3}
                max={60}
                step={1}
                value={timeInSeconds}
                onChange={handleTimeChange}
              />
              <span>{timeInSeconds}</span>
            </div>
            <div className="custom-option">
              <label htmlFor="questionsSlider">Number of Questions</label>
              <input
                type="range"
                id="questionsSlider"
                min={3}
                max={30}
                step={1}
                value={numOfQuestions}
                onChange={handleNumOfQuestionsChange}
              />
              <span>{numOfQuestions}</span>
            </div>
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
              numberOfQuestions: numOfQuestions,
              timePerQuestion: timeInSeconds,
              pointsPerQuestion: Math.floor(150 / timeInSeconds),
            }}
            goBack={goBack}
          />
        )}
      </div>
    </>
  )
}

export default Custom
