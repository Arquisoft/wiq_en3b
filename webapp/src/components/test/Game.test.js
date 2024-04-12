import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next' // Importa i18next directamente
import Game from '../../pages/Game/Game'
import { AuthContext } from '../../context/AuthContext' // Asegúrate de importar AuthContext desde la ubicación correcta

// Crea un mock de i18next
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.choose_difficulty': 'Choose difficulty',
        'play.easy': 'Easy',
        'play.medium': 'Medium',
        'play.hard': 'Hard',
      },
    },
  },
})

// Define un usuario mock
const mockUser = {
  // Proporciona aquí los datos del usuario que necesitas para tus pruebas
}

test('renders difficulty selection when no level is selected', async () => {
  render(
    <AuthContext.Provider value={{ user: mockUser }}>
      <I18nextProvider i18n={i18n}>
        <Game />
      </I18nextProvider>
    </AuthContext.Provider>
  )
  expect(await screen.findByText('Choose difficulty')).toBeInTheDocument()
  expect(await screen.findByText('Easy')).toBeInTheDocument()
  expect(await screen.findByText('Medium')).toBeInTheDocument()
  expect(await screen.findByText('Hard')).toBeInTheDocument()
})

test('difficulty selection disappears when a level is selected', async () => {
  render(
    <AuthContext.Provider value={{ user: mockUser }}>
      <I18nextProvider i18n={i18n}>
        <Game />
      </I18nextProvider>
    </AuthContext.Provider>
  )
  fireEvent.click(await screen.findByText('Easy'))
  expect(screen.queryByText('Choose difficulty')).not.toBeInTheDocument()
  expect(screen.queryByText('Easy')).not.toBeInTheDocument()
  expect(screen.queryByText('Medium')).not.toBeInTheDocument()
  expect(screen.queryByText('Hard')).not.toBeInTheDocument()
})
