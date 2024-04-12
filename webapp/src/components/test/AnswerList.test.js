import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AnswerList from '../Answer/AnswerList'

const CORRECT_ANSWER_ID = 2
const INCORRECT_ANSWER_ID = 1
const NO_ANSWER_ID = 0

const answersData = {
  correctAnswerId: CORRECT_ANSWER_ID,
  answers: [
    { id: 1, text: 'Answer 1' },
    { id: 2, text: 'Answer 2' },
    { id: 3, text: 'Answer 3' },
    { id: 4, text: 'Answer 4' },
  ],
}

describe('AnswerList component', () => {
  it('renders successfully AnswerList', () => {
    render(
      <AnswerList
        answersData={answersData}
        answerQuestionWith={_ => {}}
        selectedAnswerId={NO_ANSWER_ID}
      />
    )

    expect(screen.getByText('Answer 2')).toBeTruthy()
  })

  it('renders AnswerList with only one correct answer when user guesses', () => {
    render(
      <AnswerList
        answersData={answersData}
        answerQuestionWith={_ => {}}
        selectedAnswerId={CORRECT_ANSWER_ID}
      />
    )

    expect(screen.getByText('Answer 2')).toHaveClass('success')
  })

  it('renders AnswerList with only one correct answer and one incorrect when user is wrong', () => {
    render(
      <AnswerList
        answersData={answersData}
        answerQuestionWith={_ => {}}
        selectedAnswerId={INCORRECT_ANSWER_ID}
      />
    )

    expect(screen.getByText('Answer 2')).toHaveClass('success')
    expect(screen.getByText('Answer 1')).toHaveClass('error')
  })
})
