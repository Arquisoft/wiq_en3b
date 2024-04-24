import React from 'react'
import { render, screen } from '@testing-library/react'
import FinalResult from '../FinalResult/FinalResult'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.result.questions':
          'You answered {{correct}} correct questions out of {{total}}',
        'play.result.simple_questions':
          'You answered {{correct}} correct questions',
        'play.result.xshare_button':
        'Share your results'
      },
    },
  },
})

describe('FinalResult component', () => {
  it('FinalResult renders without crashing', () => {
    const result = 5
    const quizLength = 15
    render(
      <I18nextProvider i18n={i18n}>
        <FinalResult result={result} quizLength={quizLength} />
      </I18nextProvider>
    )
    const resultText = screen.getByText(
      `You answered ${result} correct questions out of ${quizLength}`
    )
    expect(resultText).toBeInTheDocument()
  })

  it('FinalResult renders with XShareButton', () => {
    const result = 5
    const quizLength = 15
    render(
      <I18nextProvider i18n={i18n}>
        <FinalResult result={result} quizLength={quizLength} />
      </I18nextProvider>
    )
    const shareX = screen.getByText("Share your results")
    expect(shareX).toBeInTheDocument()
  })

  it('FinalResult renders when playing hardcore', () => {
    const result = 5
    const quizLength = 0
    render(
      <I18nextProvider i18n={i18n}>
        <FinalResult result={result} quizLength={quizLength} />
      </I18nextProvider>
    )
    const resultText = screen.getByText(
      `You answered ${result} correct questions`
    )
    expect(resultText).toBeInTheDocument()
  })
  

})

