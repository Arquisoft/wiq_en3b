import '../Base.css'
import './Login.css'

import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { API_ENDPOINT } from '../../utils/constants'
import { NavLink } from 'react-router-dom'

import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const [error, setError] = useState()
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false);

  //Translation
  const { t } = useTranslation();

  const validateForm = values => {
    const error = {}

    if (!values.username) {
      error.username = t("login.empty_username_error")
    }

    if (!values.password) {
      error.password = t("login.empty_password_error")
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
        <h1>{t("login.title")}</h1>
        {error && <div className="response-error">{t("register.invalid_credentials_error")}</div>}
        <input
          type="username"
          name="username"
          id="username"
          placeholder={t("login.username_placeholder")}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <p className="form-error">{formErrors.username}</p>

        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder={t("login.password_placeholder")}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
          </button>
        </div>

        <p className="form-error">{formErrors.password}</p>
        <button className="button-common" onClick={loginHandler}>
          {t("login.button")}
        </button>
      </form>
      <NavLink to="/register">{t("login.go_register")}</NavLink>
    </div>
  )
}

export default Login
