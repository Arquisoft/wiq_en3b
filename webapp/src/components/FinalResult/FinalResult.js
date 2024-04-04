import "./FinalResult.css";

import Button from "../Button/Button";

const FinalResult = (props) => {


  return (
    <div className="final-result">
      <h1>Final result</h1>
      <p>
        You answered {props.result} question correct out of {props.quizLength}.
      </p>
      <Button onClick={props.onPlayAgain}>Play again</Button>
    </div>
  );
};

export default FinalResult;
