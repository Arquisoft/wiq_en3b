import "./AnswerItem.css";

const AnswerItem = (props) => {
  const selectAnswerHandler = () => {
    if (props.btnDisabled) {
      return;
    }
    props.onSelectAnswer(props.answer.id);
  };

  const handleAnswerItemClass = (correctAnswerId, selectedAnswerId) => {

    if (props.answer.id === correctAnswerId) return "answer-item success";

    if (props.answer.id === selectedAnswerId) return "answer-item error";

    return "answer-item";
  };

  return (
    <li
      disabled={props.btnDisabled}
      onClick={selectAnswerHandler}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          selectAnswerHandler();
        }
      }}

      className={handleAnswerItemClass(props.selected.correctId, props.selected.selectedId)}
    >
      {props.children}
    </li>
  );
};

export default AnswerItem;
