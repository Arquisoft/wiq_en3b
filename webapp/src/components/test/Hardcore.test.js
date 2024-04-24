import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../context/AuthContext'
import Hardcore from '../GameModes/Hardcore'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

const mockUser = {}

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.gamemode.hardcore.title': 'Hardcore mode',
        'play.gamemode.custom.start_button': 'Start',
      },
    },
  },
})

describe('test for Hardcore component', () => {
  test('renders Hardcore component', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <I18nextProvider i18n={i18n}>
          <Hardcore />
        </I18nextProvider>
      </AuthContext.Provider>
    )

    expect(await screen.findByText('Hardcore mode')).toBeInTheDocument()
  })

  test('it is possible to start the game', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <I18nextProvider i18n={i18n}>
          <Hardcore />
        </I18nextProvider>
      </AuthContext.Provider>
    )

    fireEvent.click(screen.getByText('Start'))
    expect(screen.queryByText('Configure your game')).not.toBeInTheDocument()
  })
})
