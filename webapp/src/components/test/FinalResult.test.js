import React from 'react'
import { render, screen } from '@testing-library/react'
import FinalResult from '../FinalResult/FinalResult'
import '@testing-library/jest-dom'

describe('FinalResult component', () => {
  it('FinalResult renders without crashing', () => {
    const result = 5;
    const quizLength = 15;
    const text = `You answered ${result} correct questions out of ${quizLength}` // TODO: Change!! Is not taking i18n into account
    renderFinalResultAndTestText(result,quizLength,text)
  })

  it('FinalResult renders the X Share Button', () => {
    const text = "Share your results"
    renderFinalResultAndTestText(5,15,text)
  })

  it('FinalResult renders when playing hardcore', () => {
    const result = 5
    const quizLength = 0
    const text = `You answered ${result} question correct`
    renderFinalResultAndTestText(result,quizLength,text)
  })

  function renderFinalResultAndTestText(result,quizLength, text){
    render(<FinalResult result={result} quizLength={quizLength} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  }
  

})

