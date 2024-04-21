import '../Base.css'
import './AddUser.css'

import axios from 'axios'
import { useState } from 'react'
import { API_ENDPOINT } from '../../utils/constants'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState('')
  const { login } = useAuth()

  const { t } = useTranslation();

  const validateForm = values => {
    const error = {}

    if (!values.username) {
      error.username = t("register.empty_username_error")
    }

    if (!values.password) {
      error.password = t("register.empty_password_error")
    } else if (values.password.length < 8) {
      error.password = t("register.password_length_error")
    }

    if (!values.repeatPassword) {
      error.repeatPassword = t("register.empty_password_confirm_error")
    } else if (values.repeatPassword !== values.password) {
      error.repeatPassword = t("register.passwords_not_match_error")
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
    <div className="register">
      <form onSubmit={addUser}>
        <h1>{t("register.form_title")}</h1>
        {error && <div className="response-error">{error}</div>}
        <input
          type="username"
          name="username"
          id="username"
          placeholder={t("register.username_placeholder")}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <p className="form-error">{formErrors.username}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder={t("register.password_placeholder")}
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <p className="form-error">{formErrors.password}</p>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder={t("register.password_confirm_placeholder")}
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
        />
        <p className="form-error">{formErrors.repeatPassword}</p>
        <button className="button-common">{t("register.button")}</button>
      </form>
      <Link to="/login">{t("register.go_login")}</Link>
    </div>
  )
}
export default AddUser
