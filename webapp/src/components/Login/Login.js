import { useState } from 'react'
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { useAuth } from '../../hooks/useAuth'
import { API_ENDPOINT } from '../../utils/constants'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const [, setError] = useState()
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      error.username = "Username is required";
    } else if (!regex.test(values.username)) {
      error.username = "Please enter a valid username address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm({
      username,
      password
    }));

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
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <p className={basestyle.error}>{formErrors.usernmae}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/register">Not yet registered? Register Now</NavLink>
    </div>
) 
}

export default Login