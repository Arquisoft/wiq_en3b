import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon-solid.svg";

const Header = ({ onChangeTheme, theme, onToggleNav, authenticated, onLogout }) => {
  const handleLogout = () => {
    // Realizar la acción de logout
    onLogout();
  };

  return (
    <header className="header">
      <img src="KaW.png" alt="Logo of Know and Win APP" />
      <div className="theme" onClick={onChangeTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </div>
      {authenticated ? (
        // Mostrar botón de logout si el usuario está autenticado
        <div className="header-button" onClick={handleLogout}>
          Logout
        </div>
      ) : (
        // Mostrar botón de login si el usuario no está autenticado
        <Link to="/login" className="header-button">
          Login
        </Link>
      )}
      <div className="header-button" onClick={onToggleNav}>
        <BarIcon />
      </div>
    </header>
  );
};

export default Header;
