import React from 'react'
import { render, screen } from '@testing-library/react'
import Timer from '../Quiz/Timer'
import '@testing-library/jest-dom'

describe('Timer', () => {
  test('renders Timer component with correct time format', () => {
    const timer = Date.now()
    const onComplete = jest.fn()
    const innerRef = React.createRef()

    render(
      <Timer timer={timer} id="0" onComplete={onComplete} innerRef={innerRef} />
    )

    const countdown = screen.getByText('00:00')
    expect(countdown).toBeInTheDocument()
  })
})
