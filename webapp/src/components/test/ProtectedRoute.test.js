import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProtectedRoute } from '../ProtectedRoute'
import '@testing-library/jest-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

jest.mock('../../hooks/useAuth')

const mockUseAuth = jest.mocked(useAuth)

const renderProtectedRouteTreeScenario = () =>
  render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <p>I am logged in!</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>You need to login</p>} />
      </Routes>
    </BrowserRouter>
  )

describe('Protected route component', () => {
  it('renders content inside protected route when authenticated', () => {
    mockUseAuth.mockImplementation(() => ({
      user: {
        username: 'theBestTestInTheWorld',
        token: 'aVeryGoodToken',
      },
    }))

    renderProtectedRouteTreeScenario()

    expect(screen.getByText(/I am logged in!/i)).toBeInTheDocument()
  })

  it('redirects to /login when entering a route that requires the user to be logged in', () => {
    mockUseAuth.mockImplementation(() => ({
      user: null,
    }))

    renderProtectedRouteTreeScenario()

    expect(screen.getByText(/You need to login/i)).toBeInTheDocument()
  })
})
