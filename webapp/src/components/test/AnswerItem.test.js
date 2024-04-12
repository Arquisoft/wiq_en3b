import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AnswerItem from '../Answer/AnswerItem'
import '@testing-library/jest-dom'

describe('AnswerItem component', () => {
  it('renders successfully', () => {
    render(
      <AnswerItem
        onClick={() => {}}
        className="answer-item"
        disabled={false}
        children
      >
        Answer 1
      </AnswerItem>
    )

    expect(screen.getByText('Answer 1')).toBeInTheDocument()
  })

  it('answer item can be clicked', () => {
    const onClick = jest.fn()

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

    fireEvent.click(screen.getByText('Answer 1'))
    expect(onClick).toHaveBeenCalled()
  })
})
