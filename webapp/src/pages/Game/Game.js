import Quiz from "../../components/Quiz/Quiz"

const Game = props => {

  return (
    <div className="quiz-wrapper">
      <Quiz timerValue={props.timerValue} />
    </div>
  )
}

export default Game