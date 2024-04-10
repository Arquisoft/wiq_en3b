import './Nav.css'

import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { ReactComponent as CloseIcon } from '../../assets/xmark-solid.svg'
import { ReactComponent as SquareQuestionIcon } from '../../assets/square-question.svg'
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { ReactComponent as AwardIcon } from '../../assets/award-solid.svg'
import { ReactComponent as SettingsIcon } from '../../assets/gear-solid.svg'
import { ReactComponent as LoginIcon } from '../../assets/login-solid.svg'
import { ReactComponent as LogoutIcon } from '../../assets/logout-solid.svg'
import { ReactComponent as SingUpIcon } from '../../assets/signup-solid.svg'
import { useAuth } from '../../hooks/useAuth'
import { useTranslation } from "react-i18next";


const Nav = (props) => {

  //Translation
  const { t } = useTranslation();


  const { user } = useAuth()
  const handleCloseNav = event => {
    if (event.target.closest('.nav')) {
      return
    }

    props.onToggleNav()
  }
  useEffect(() => {
    if (props.openNav) {
      document.documentElement.classList.add('nav-open');
    } else {
      document.documentElement.classList.remove('nav-open');
    }
  }, [props.openNav]);

  useEffect(() => {
    const closeNav = (event) => {
      if (event.key === 'Escape' && props.openNav) {
        props.onToggleNav()
      }
    }
    window.addEventListener('keydown', closeNav)

    return () => {
      window.removeEventListener('keydown', closeNav)
    }
  }, [props]);



  return (
    <div className="nav-overlay" onClick={handleCloseNav}>
      <div className={`nav ${props.openNav ? 'show' : ''}`}>
        <div className="nav-header">
          <div className="close-button" onClick={props.onToggleNav} tabIndex={props.openNav ? '0' : '-1'} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              props.onToggleNav();
            }
          }}>
            <CloseIcon />
          </div>
        </div>

        <div className="nav-body">
          <Link to="/" className="nav-link">
            <div className="nav-link-icon">
              <UserIcon />
            </div>
            {t("home.title")}
          </Link>

          {user && (
            <Link to="game" className="nav-link">
              <div className="nav-link-icon">
                <SquareQuestionIcon />
              </div>
              {t("play.title")}
            </Link>
          )}

          {user && (
            <Link to="profile" className="nav-link">
              <div className="nav-link-icon">
                <UserIcon />
              </div>
              Profile
            </Link>
          )}

          <Link to="leaderboard" className="nav-link">
            <div className="nav-link-icon">
              <AwardIcon />
            </div>
            {t("leaderboard.title")}
          </Link>

          {user && (
            <Link to="settings" className="nav-link">
              <div className="nav-link-icon">
                <SettingsIcon />
              </div>
              {t("settings.title")}
            </Link>
          )}

          <Link to={user ? '/logout' : '/login'} className="nav-link">
            <div className="nav-link-icon">
              {user ? <LogoutIcon /> : <LoginIcon />}
            </div>
            {user ? 'Logout' : 'Login'}
          </Link>

          {!user && (
            <Link to="register" className="nav-link">
              <div className="nav-link-icon">
                <SingUpIcon />
              </div>
              Register
            </Link>)}
        </div>
      </div>
    </div>
  )
}

export default Nav
