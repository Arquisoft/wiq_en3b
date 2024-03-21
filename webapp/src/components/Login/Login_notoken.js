import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const apiEndpoint = 'http://localhost:8000';

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required";
    } else if (!regex.test(values.username)) {
      errors.username = "Please enter a valid username address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const logoutHandler = async () => {
    setLoginSuccess(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);

    try {
      const response = await axios.post(`${apiEndpoint}/login`, user);
      const { username, createdAt: userCreatedAt } = response.data;
      
      setUserDetails({
        ...user,
        username: username,
      });

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);
      setUserState(response.data.user);
    } catch (error) {
      setError('Username or password is incorrect');
    }
  };

  return (
    <div className={loginstyle.login}>
      {!loginSuccess ? (
        <form>
          <h1>Login</h1>
          {error && <p className={basestyle.error}>{error}</p>}
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            onChange={changeHandler}
            value={user.username}
          />
          <p className={basestyle.error}>{formErrors.username}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button className={basestyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
      ) : (
        <div>
          <h1>Login Success</h1>
          <p>Welcome {user.username}</p>
          <button className={basestyle.button_common} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
