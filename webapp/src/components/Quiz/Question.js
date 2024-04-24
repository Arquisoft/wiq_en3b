import './Question.css'

import AnswerList from '../Answer/AnswerList'

import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <div className="quiz">
      <div className="quiz-counter">
        {quizLength !== 0
          ? t('play.question_counter', { current: id + 1, total: quizLength })
          : t('play.simple_question_counter', { current: id + 1 })}
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
