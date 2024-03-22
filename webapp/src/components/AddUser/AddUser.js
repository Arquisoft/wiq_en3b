// src/components/AddUser.js
import React, { useState } from 'react'

import basestyle from "../Base.module.css";
import registerstyle from "./AddUser.module.css";

import axios from 'axios'
import { API_ENDPOINT } from '../../utils/constants'
import { useAuth } from '../../hooks/useAuth'
import { NavLink } from 'react-router-dom';

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [, setError] = useState('')
  const { login } = useAuth()

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      error.username = "Email is required";
    } else if (!regex.test(values.username)) {
      error.username = "This is not a valid email format!";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length <= 12) {
      error.password = "Password must be at least 12 characters";
    }

    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };

  const addUser = async () => {
    setFormErrors(validateForm({
      username, password, cpassword: repeatPassword
    }));

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

      console.log(obj)

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
    <div className={registerstyle.register}>
      <form>
        <h1>Create your account</h1>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <p className={basestyle.error}>{formErrors.username}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
        />
        <p className={basestyle.error}>{formErrors.cpassword}</p>
        <button className={basestyle.button_common} onClick={addUser}>
          Register
        </button>
      </form>
      <NavLink to="/login">Already registered? Login</NavLink>
    </div>
  </>
  )
}

export default AddUser
