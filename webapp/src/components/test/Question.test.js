import React from 'react'
import { render, screen } from '@testing-library/react'
import Question from '../Quiz/Question'
import '@testing-library/jest-dom'

describe('Question component', () => {
  const mockProps = {
    question: {
      id: 0,
      question: 'What is the capital of France?',
      image: 'paris.jpg',
      answers: [
        { id: 1, text: 'London' },
        { id: 2, text: 'Paris' },
        { id: 3, text: 'Berlin' },
        { id: 4, text: 'Rome' },
      ],
      correctAnswerId: 2,
    },
    quizLength: 1,
    answerQuestionWith: _ => {},
    selectedAnswerId: 0,
  }

  it('renders question text', () => {
    render(<Question {...mockProps} />)
    expect(
      screen.getByText('What is the capital of France?')
    ).toBeInTheDocument()
  })

  it('renders quiz image if provided', () => {
    render(<Question {...mockProps} />)
    expect(screen.getByAltText('Question')).toBeInTheDocument()
  })

  it('renders answer list', () => {
    render(<Question {...mockProps} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('displays question counter', () => {
    render(<Question {...mockProps} />)
    expect(screen.getByText('Question 1 of 1')).toBeInTheDocument()
  })
})
