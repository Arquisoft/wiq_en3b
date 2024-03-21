import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const apiEndpoint = 'http://localhost:8000';
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    cpassword: "",
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
    if (!values.username) {
      error.username = "Username is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(`${apiEndpoint}/register`, user).then(() => {
        navigate("/login", { replace: true });
      }).catch((error) => {
        console.log(error.response.data);
      });
    }
  }, [formErrors, isSubmit, user, navigate, apiEndpoint]);

  return (
    <div className={registerstyle.register}>
      <form>
        <h1>Create your account</h1>
        <p className={basestyle.error}>{formErrors.lname}</p>
        <input
          type="text"
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
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={changeHandler}
          value={user.cpassword}
        />
        <p className={basestyle.error}>{formErrors.cpassword}</p>
        <button className={basestyle.button_common} onClick={signupHandler}>
          Register
        </button>
      </form>
      <NavLink to="/login">Already registered? Login</NavLink>
    </div>
  );
};

export default Register;
