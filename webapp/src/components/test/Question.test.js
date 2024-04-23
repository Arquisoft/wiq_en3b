import React from 'react'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import Question from '../Quiz/Question'
import '@testing-library/jest-dom'

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.question_counter': 'Question {{current}} of {{total}}',
        'play.simple_question_counter': 'Question {{current}}',
      },
    },
  },
})

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
    render(
      <I18nextProvider i18n={i18n}>
        <Question {...mockProps} />
      </I18nextProvider>
    )
    expect(
      screen.getByText('What is the capital of France?')
    ).toBeInTheDocument()
  })

  it('renders quiz image if provided', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Question {...mockProps} />
      </I18nextProvider>
    )
    expect(screen.getByAltText('Question')).toBeInTheDocument()
  })

  it('renders answer list', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Question {...mockProps} />
      </I18nextProvider>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('displays question counter', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Question {...mockProps} />
      </I18nextProvider>
    )
    expect(screen.getByText('Question 1 of 1')).toBeInTheDocument()
  })

  it('renders question counter when hardcore', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Question {...{ ...mockProps, quizLength: 0 }} />
      </I18nextProvider>
    )
    expect(screen.getByText('Question 1')).toBeInTheDocument()
  })
})
