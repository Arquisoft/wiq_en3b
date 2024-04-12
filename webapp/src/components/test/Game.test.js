import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import Game from '../../pages/Game/Game'
import { AuthContext } from '../../context/AuthContext'

test('renders gamemodes when no gamemode is selected', async () => {
  render(
    <AuthContext.Provider value={{ user: {} }}>
      <I18nextProvider i18n={i18n}>
        <Game />
      </I18nextProvider>
    </AuthContext.Provider>
  )
  expect(await screen.findByText('Select the gamemode')).toBeInTheDocument()
  expect(await screen.findByText('Classic')).toBeInTheDocument()
  expect(await screen.findByText('Custom')).toBeInTheDocument()
})

test('gamemode selection disappears when a gamemode is selected', async () => {
  render(
    <AuthContext.Provider value={{ user: {} }}>
      <I18nextProvider i18n={i18n}>
        <Game />
      </I18nextProvider>
    </AuthContext.Provider>
  )

  fireEvent.click(await screen.findByText('Custom'))

  expect(screen.queryByText('Select the gamemode')).not.toBeInTheDocument()
  expect(screen.queryByText('Classic')).not.toBeInTheDocument()
  expect(screen.queryByText('Custom')).not.toBeInTheDocument()
})
