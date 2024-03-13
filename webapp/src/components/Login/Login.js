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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
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
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
    try {
      let username = user.username;
      let password = user.password;
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });
    } catch (error){
      console.log("ERROR: " + error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:9002/login", user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        navigate("/", { replace: true });
      });
    }
  }, [formErrors]);
  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          onChange={changeHandler}
          value={user.usernmae}
        />
        <p className={basestyle.error}>{formErrors.usernmae}</p>
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
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
