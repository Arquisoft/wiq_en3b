import React from 'react'
import { render, screen } from '@testing-library/react'
import FinalResult from '../FinalResult/FinalResult'
import '@testing-library/jest-dom'

describe('FinalResult component', () => {
  it('FinalResult renders without crashing', () => {
    const result = 5
    const quizLength = 15
    render(<FinalResult result={result} quizLength={quizLength} />)
    const resultText = screen.getByText(
      `You answered ${result} question correct out of ${quizLength}.`
    )
    expect(resultText).toBeInTheDocument()
  })

  it('FinalResult renders when playing hardcore', () => {
    const result = 5
    const quizLength = 0
    render(<FinalResult result={result} quizLength={quizLength} />)
    const resultText = screen.getByText(
      `You answered ${result} question correct`
    )
    expect(resultText).toBeInTheDocument()
  })
})
