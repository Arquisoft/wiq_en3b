import "./Header.css";

import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon-solid.svg";

const Header = (props) => {
  return (
    <header className="header">
      <div className="theme" onClick={props.onChangeTheme} data-testid="theme-button">
        {props.theme === "light" ? <MoonIcon data-testid="theme-icon" /> : <SunIcon data-testid="theme-icon" />}
      </div>
      <div className="header-button" onClick={props.onToggleNav} data-testid="nav-button">
        <BarIcon />
      </div>
    </header>
  );
};

export default Header;
