import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from '../../App'
import { runI18n } from './utils/i18n.test-utils'

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
