import '../Base.css'
import './Login.css'

import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { API_ENDPOINT } from '../../utils/constants'
import { NavLink } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const [error, setError] = useState()
  const [formErrors, setFormErrors] = useState({})

  const validateForm = values => {
    const error = {}

    if (!values.username) {
      error.username = 'Username is required'
    }

    if (!values.password) {
      error.password = 'Password is required'
    }

    return error
  }

  const loginHandler = async e => {
    e.preventDefault()
    const errors = validateForm({
      username,
      password,
    })

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    try {
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
    <div className="login">
      <form>
        <h1>Login</h1>
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
        <button className="button-common" onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/register">Not yet registered? Register Now</NavLink>
    </div>
  )
}

export default Login
