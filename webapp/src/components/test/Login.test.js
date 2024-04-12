import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const mockUser = {
  username: 'mateo2',
  password: '1234567891011',
}
const mockLogin = jest.fn()

jest.mock('axios')

const renderLoginTree = (user, login) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, login }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  )

const fillLoginForm = (username, password) => {
  const usernameInput = screen.getByPlaceholderText('Username')
  const passwordInput = screen.getByPlaceholderText('Password')

  fireEvent.change(usernameInput, { target: { value: username } })
  fireEvent.change(passwordInput, { target: { value: password } })
  fireEvent.click(screen.getByRole('button', { name: 'Login' }))
}

describe('login tests', () => {
  test('renders without crashing', () => {
    renderLoginTree(mockUser, mockLogin)
  })

  test('renders welcome message', () => {
    renderLoginTree(mockUser, mockLogin)

    expect(
      screen.getByText('Welcome to Know and Win App, please login to procceed')
    ).toBeInTheDocument()
  })

  test('renders login component', () => {
    renderLoginTree(mockUser, mockLogin)

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  })

  test('submits the form with valid username and password', async () => {
    axios.post.mockResolvedValue({
      data: {
        data: {
          user: {
            username: 'testuser',
            token: 'mockedToken',
          },
        },
      },
    })

    renderLoginTree(mockUser, mockLogin)

    fillLoginForm('testuser', 'testpassword')

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        token: 'mockedToken',
      })
    })
  })

  test('submits the form with invalid username', async () => {
    renderLoginTree(mockUser, mockLogin)

    fillLoginForm('', 'testpassword')

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
    })
  })

  test('submits the form with invalid password', async () => {
    renderLoginTree(mockUser, mockLogin)

    fillLoginForm('testuser', '')

    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  test('submits the form and there is a server error', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          status: 'error',
          error: 'Error message',
        },
      },
    })

    renderLoginTree(mockUser, mockLogin)

    fillLoginForm('testuser', 'testpassword')

    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  test('submits the form and there is a client error', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          status: 'fail',
          data: {
            error: 'Network error message',
          },
        },
      },
    })

    renderLoginTree(mockUser, mockLogin)

    fillLoginForm('testuser', 'testpassword')

    await waitFor(() => {
      expect(screen.getByText('Network error message')).toBeInTheDocument()
    })
  })
})
