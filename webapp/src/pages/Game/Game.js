import Quiz from "../../components/Quiz/Quiz";

const Game = (props) => {
  return (
    <div className="quiz-wrapper">
      <Quiz quizData={props.quizData} timerValue={props.timerValue} />
    </div>
  );
};

export default Game;
