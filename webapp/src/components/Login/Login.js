import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const apiEndpoint = 'http://localhost:8000';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar la existencia del token JWT al cargar la página
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al home si el usuario ya está autenticado
      navigate("/", { replace: true });
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiEndpoint}/login`, user);
      const { token } = response.data;
      
      // Almacenar el token JWT en el almacenamiento local
      localStorage.setItem('token', token);
      
      // Redirigir a la página de inicio
      navigate("/", { replace: true });
    } catch (error){
      setError('Username or password is incorrect');
    }
  };

  return (
    <div className={loginstyle.login}>
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
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
