import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AnswerItem from '../Answer/AnswerItem'
import '@testing-library/jest-dom'

const renderAnswerItemTree = onClick => {
  render(
    <AnswerItem
      onClick={onClick}
      className="answer-item"
      disabled={false}
      children
    >
      Answer 1
    </AnswerItem>
  )
}

describe('AnswerItem component', () => {
  it('renders successfully', () => {
    renderAnswerItemTree(() => {})

    expect(screen.getByText('Answer 1')).toBeInTheDocument()
  })

  it('answer item can be clicked', () => {
    const onClick = jest.fn()

    renderAnswerItemTree(onClick)

    fireEvent.click(screen.getByText('Answer 1'))
    expect(onClick).toHaveBeenCalled()
  })

  it('answer item can be focused and pressed enter', () => {
    const onClick = jest.fn()

    renderAnswerItemTree(onClick)

    const answerElement = screen.getByText('Answer 1')
    answerElement.focus()
    fireEvent.keyDown(answerElement, { key: ' ' })
    expect(onClick).toHaveBeenCalled()
  })

  it('answer item can be focused and pressed space', () => {
    const onClick = jest.fn()

    renderAnswerItemTree(onClick)

    const answerElement = screen.getByText('Answer 1')
    answerElement.focus()
    fireEvent.keyDown(answerElement, { key: ' ' })
    expect(onClick).toHaveBeenCalled()
  })
})
