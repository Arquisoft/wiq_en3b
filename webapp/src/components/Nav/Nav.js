import "./Nav.css";

import { Link } from "react-router-dom";

import { ReactComponent as CloseIcon } from "../../assets/xmark-solid.svg";
import { ReactComponent as SquareQuestionIcon } from "../../assets/square-question.svg";
import { ReactComponent as UserIcon } from "../../assets/user-solid.svg";
import { ReactComponent as AwardIcon } from "../../assets/award-solid.svg";
import { ReactComponent as SettingsIcon } from "../../assets/gear-solid.svg";

import { useTranslation } from "react-i18next";


const Nav = (props) => {

  //Translation
  const { t } = useTranslation();

  return (
    <div className={`nav ${props.openNav ? "show" : ""}`}>
      <div className="nav-header">
        <div className="close-button" onClick={props.onToggleNav}>
          <CloseIcon />
        </div>
      </div>

      <div className="nav-body">

        <Link to="home" className="nav-link">
          <div className="nav-link-icon">
            <UserIcon />
          </div>
          {t("home.title")}
        </Link>

        <Link to="game" className="nav-link">
          <div className="nav-link-icon">
            <SquareQuestionIcon />
          </div>
          {t("play.title")}
        </Link>

        <Link to="profile" className="nav-link">
          <div className="nav-link-icon">
            <UserIcon />
          </div>
          {t("profile.title")}
        </Link>

        <Link to="leaderboard" className="nav-link">
          <div className="nav-link-icon">
            <AwardIcon />
          </div>
          {t("leaderboard.title")}
        </Link>

        <Link to="settings" className="nav-link">
          <div className="nav-link-icon">
            <SettingsIcon />
          </div>
          {t("settings.title")}
        </Link>
      </div>
    </div>
  );
};

export default Nav;
