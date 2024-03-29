import "./Header.css";
import { Link } from 'react-router-dom';
import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon-solid.svg";
import { useAuth } from "../../hooks/useAuth";

const Header = (props) => {
  const { user } = useAuth();
  return (
    <header className="header">
      <Link to="/">
        <img src="KaW.png" alt="Logo of Know and Win APP" />
      </Link>
      <div className="options">
        <div className="theme" onClick={props.onChangeTheme}>
          {props.theme === "light" ? <MoonIcon /> : <SunIcon />}
        </div>
        <div className="header-button" onClick={props.onToggleNav}>
          <BarIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
