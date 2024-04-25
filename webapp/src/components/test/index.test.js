import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from '../../App'
import { runI18n } from './utils/i18n.test-utils'
import i18n from 'i18next'

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        
      },
    },
  },
})

it('renders without crashing', () => {
  runI18n()
  const root = document.createElement('div')
  document.body.appendChild(root)

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  )
})
