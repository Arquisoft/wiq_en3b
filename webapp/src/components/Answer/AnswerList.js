import './AnswerList.css'

import AnswerItem from './AnswerItem'

const AnswerList = ({ answersData, selectedAnswerId, answerQuestionWith }) => {
  const { correctAnswerId, answers } = answersData
  const hasSelected = Boolean(selectedAnswerId)

  return (
    <ul className="answer-list">
      {answers.map(answer => {
        const { id, text } = answer
        let className = 'answer-item '

        if (hasSelected) {
          if (id === correctAnswerId) {
            className += 'success'
          }

          if (id === selectedAnswerId && id !== correctAnswerId) {
            className += 'error'
          }
        }

        return (
          <AnswerItem
            key={id}
            onClick={answerQuestionWith(id)}
            className={className}
            disabled={hasSelected}
          >
            {text}
          </AnswerItem>
        )
      })}
    </ul>
  )
}

export default AnswerList
