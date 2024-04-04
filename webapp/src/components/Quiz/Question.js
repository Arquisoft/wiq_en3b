import "./Question.css";

import AnswerList from "../Answer/AnswerList";

const Question = (props) => {
  return (
    <div className="quiz">
      <div className="quiz-counter">
        Question {props.activeQuizIndex} of {props.quizLength}
      </div>
      <div className="question">
        <p className="question-text">{props.quiz.question}</p>
        {props.quiz.image && (
          <div className="quiz-image">
            <img src={props.quiz.image} alt="Question" />
          </div>
        )}
      </div>

      <AnswerList
        btnDisabled={props.btnDisabled}
        answers={props.quiz.answers}
        onSelectAnswer={props.onSelectAnswer}
        selected={props.selected}
      />
    </div>
  );
};

export default Question;
