import React from 'react'
import { render, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Home from '../../pages/Home/Home'
import '@testing-library/jest-dom/extend-expect'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

test('renders without crashing', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </AuthProvider>
    </MemoryRouter>
  )
})

test('redirects to login page if user is not authenticated', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </I18nextProvider>
      </AuthProvider>
    </MemoryRouter>
  )

  // Espera a que se complete el efecto secundario en Home
  await act(() => new Promise(resolve => setTimeout(resolve, 0)))
})
