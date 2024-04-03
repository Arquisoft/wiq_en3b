import React, { useState } from "react"

import { useQuestions } from '../../hooks/useQuestions'
import { useSettings } from '../../hooks/useSettings'
import { useToggle } from '../../hooks/useToggle'

import Quiz from '../../components/Quiz/Quiz'
import Button from '../../components/Button/Button'

import "./Game.css"

import { useTranslation } from "react-i18next"

const Game = () => {
  const { questions } = useQuestions()
  const { time } = useSettings()
  const [isGameStarted, toggleGameStarted] = useToggle(false)

  const areQuestionsAvailable = Boolean(questions.length)

  var [currentLevel, setCurrentLevel] = useState()
  const { t } = useTranslation();

  function goEasyLevel() {
    setCurrentLevel("easy")
  }

  function goMediumLevel() {
    setCurrentLevel("medium")
  }

  function goHardLevel() {
    setCurrentLevel("hard")

    if (!isGameStarted) {
      return (
        <div className="quiz-wrapper">
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            Do you want to start the game? Click on the following button
          </div>
          <Button onClick={toggleGameStarted} disabled={!areQuestionsAvailable}>
            Start game
          </Button>
        </div>
      )
    }

    return (
      <div className="quiz-wrapper">
        {!currentLevel && (
          <div className="header-and-buttons-container">
            <h2>{t("play.choose_difficulty")}</h2>
            <div className="button-container">
              <Button onClick={goEasyLevel}>{t("play.easy")}</Button>
              <Button onClick={goMediumLevel}>{t("play.medium")}</Button>
              <Button onClick={goHardLevel}>{t("play.hard")}</Button>
            </div>
          </div>
        )}
        {currentLevel && (
          <Quiz timerValue={props.timerValue} level={currentLevel} />
        )}
      </div>
    )
  }

  export default Game
