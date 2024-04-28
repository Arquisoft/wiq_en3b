import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from '../../App'
import { runI18n } from './utils/i18n.test-utils'

jest.mock('react-lottie', () => ({
  __esModule: true,
  default: () => <div>Lottie</div>,
}));


it('renders without crashing', () => {
  runI18n()

  if (typeof document !== 'undefined') {
    const root = document.createElement('div')
    document.body.appendChild(root)

    render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
        root
    )
  }
})

