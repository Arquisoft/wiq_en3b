import Quiz from "../../components/Quiz/Quiz"

const Game = props => {
  if (!props.quizData.length) {
    return <div className="quiz-wrapper"></div>
  }

  return (
    <div className="quiz-wrapper">
      <Quiz quizData={props.quizData} timerValue={props.timerValue} />
    </div>
  )
}

export default Game