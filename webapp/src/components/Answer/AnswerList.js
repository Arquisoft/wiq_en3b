import "./AnswerList.css";

import AnswerItem from "./AnswerItem";

const AnswerList = (props) => {
  return (
    <ul className="answer-list">
      {props.answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          onSelectAnswer={props.onSelectAnswer}
          answer={answer}
          selected={props.selected}
          btnDisabled={props.btnDisabled}
        >
          {answer.text}
        </AnswerItem>
      ))}
    </ul>
  );
};

export default AnswerList;
