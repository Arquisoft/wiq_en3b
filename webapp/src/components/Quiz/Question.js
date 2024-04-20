import './Question.css'

import AnswerList from '../Answer/AnswerList'

const Question = ({
  question: questionData,
  quizLength,
  answerQuestionWith,
  selectedAnswerId,
}) => {
  const { id, question, answers, correctAnswerId, image = false } = questionData
  const answersData = {
    correctAnswerId,
    answers,
  }

  return (
    <div className="quiz">
      <div className="quiz-counter">
        Question {id + 1} {quizLength !== 0 && `of ${quizLength}`}
      </div>
      <div className="question">
        <p className="question-text">{question}</p>
        {image && (
          <div className="quiz-image">
            <img src={image} alt="Question" />
          </div>
        )}
      </div>

      <AnswerList
        answersData={answersData}
        answerQuestionWith={answerQuestionWith}
        selectedAnswerId={selectedAnswerId}
      />
    </div>
  )
}

export default Question
