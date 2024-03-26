import React, { useState } from "react"
import Quiz from "../../components/Quiz/Quiz"
import Button from "../../components/Button/Button"
import "./Game.css"

const Game = props => {

  var [currentLevel, setCurrentLevel] = useState()

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
          <h2>Choose your difficulty</h2>
          <div className="button-container">
            <Button onClick={goEasyLevel}>Easy</Button>
            <Button onClick={goMediumLevel}>Medium</Button>
            <Button onClick={goHardLevel}>Hard</Button>
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