import '../Base.css'
import './AddUser.css'

import axios from 'axios'
import { useState } from 'react'
import { API_ENDPOINT } from '../../utils/constants'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState('')
  const { login } = useAuth()

  const validateForm = values => {
    const error = {}

    if (!values.username) {
      error.username = 'Username is required'
    }

    if (!values.password) {
      error.password = 'Password is required'
    } else if (values.password.length < 8) {
      error.password = 'Password must be at least 8 characters'
    }

    if (!values.repeatPassword) {
      error.repeatPassword = 'Confirm Password is required'
    } else if (values.repeatPassword !== values.password) {
      error.repeatPassword = 'Confirm password and password should be same'
    }

    return error
  }

  const addUser = async e => {
    e.preventDefault()

    const errors = validateForm({
      username,
      password,
      repeatPassword,
    })

    const isThereErrors = Boolean(Object.keys(errors).length)

    setFormErrors(errors)

    if (isThereErrors) {
      return
    }

    try {
      await axios.post(`${API_ENDPOINT}/adduser`, {
        username,
        password,
      })

      const response = await axios.post(`${API_ENDPOINT}/login`, {
        username,
        password,
      })

      const { username: user, token } = response.data.data.user

      const obj = {
        username: user,
        token,
      }

      login(obj)
    } catch (error) {
      const status = error.response.data.status

      if (status === 'error') {
        setError(error.response.data.error)
      } else {
        setError(error.response.data.data.error)
      }
    }
  }

  return (
    <>
      <div className="register">
        <form onSubmit={addUser}>
          <h1>Create your account</h1>
          {error && <div className="response-error">{error}</div>}
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <p className="form-error">{formErrors.username}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <p className="form-error">{formErrors.password}</p>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Repeat Password"
            onChange={e => setRepeatPassword(e.target.value)}
            value={repeatPassword}
          />
          <p className="form-error">{formErrors.repeatPassword}</p>
          <button className="button-common">Register</button>
        </form>
        <Link to="/login">Already registered? Login</Link>
      </div>
    </>
  )
}

export default AddUser
