import React, { useState } from "react"

import Quiz from '../../components/Quiz/Quiz'
import Button from '../../components/Button/Button'

import "./Game.css"

import { useTranslation } from "react-i18next"

const Game = (props) => {

  const [level, setLevel] = useState()
  const { t } = useTranslation();

  function goEasyLevel() {
    setLevel("easy")
  }

  function goMediumLevel() {
    setLevel("medium")
  }

  function goHardLevel() {
    setLevel("hard")
  }

  return (
    <div className="quiz-wrapper">
      {!level && (
        <div className="header-and-buttons-container">
          <h2>{t("play.choose_difficulty")}</h2>
          <div className="button-container">
            <Button onClick={goEasyLevel}>{t("play.easy")}</Button>
            <Button onClick={goMediumLevel}>{t("play.medium")}</Button>
            <Button onClick={goHardLevel}>{t("play.hard")}</Button>
          </div>
        </div>
      )}
      {level && (
        <Quiz level={level} />
      )}
    </div>
  )
}

export default Game
