import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../context/AuthContext'
import Hardcore from '../GameModes/Hardcore'

const mockUser = {}

describe('test for Hardcore component', () => {
  test('renders Hardcore component', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Hardcore />
      </AuthContext.Provider>
    )

    expect(await screen.findByText('Hardcore mode')).toBeInTheDocument()
  })

  test('it is possible to start the game', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Hardcore />
      </AuthContext.Provider>
    )

    fireEvent.click(screen.getByText('Start'))
    expect(screen.queryByText('Configure your game')).not.toBeInTheDocument()
  })
})
