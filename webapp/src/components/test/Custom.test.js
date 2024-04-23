import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../context/AuthContext'
import Custom from '../GameModes/Custom'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

const mockUser = {}

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.gamemode.custom.title': 'Configure your game',
        'play.gamemode.custom.time': 'Time (Seconds)',
        'play.gamemode.custom.questions': 'Number of Questions',
        'play.gamemode.custom.start_button': 'Start',
      },
    },
  },
})

describe('test for custom component', () => {
  test('renders custom component', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <I18nextProvider i18n={i18n}>
          <Custom />
        </I18nextProvider>
      </AuthContext.Provider>
    )

    expect(await screen.findByText('Configure your game')).toBeInTheDocument()
  })

  test('it is possible to change the sliders and start the game', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <I18nextProvider i18n={i18n}>
          <Custom />
        </I18nextProvider>
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
