import React, { useState } from "react"
import Quiz from "../../components/Quiz/Quiz"
import Button from "../../components/Button/Button"
import "./Game.css"
import { useTranslation } from "react-i18next"

const Game = props => {

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
  );
}


export default Game