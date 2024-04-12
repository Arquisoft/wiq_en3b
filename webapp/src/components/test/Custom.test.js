import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../context/AuthContext'
import Custom from '../GameModes/Custom'

const mockUser = {}

describe('test for custom component', () => {
  test('renders custom component', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Custom />
      </AuthContext.Provider>
    )

    expect(await screen.findByText('Configure your game')).toBeInTheDocument()
  })

  test('it is possible to change the sliders and start the game', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Custom />
      </AuthContext.Provider>
    )

    const timeSlider = screen.getByLabelText('Time (Seconds)')
    fireEvent.change(timeSlider, { target: { value: 32 } })
    expect(screen.getByText('32')).toBeInTheDocument()

    const questionsSlider = screen.getByLabelText('Number of Questions')
    fireEvent.change(questionsSlider, { target: { value: 12 } })
    expect(screen.getByText('12')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Start'))
    expect(screen.queryByText('Configure your game')).not.toBeInTheDocument()
  })
})
