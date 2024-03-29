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
import { useAuth } from '../../hooks/useAuth'

const Nav = props => {
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
  return (
    <div className="nav-overlay" onClick={handleCloseNav}>
    <div className={`nav ${props.openNav ? 'show' : ''}`}>
      <div className="nav-header">
        <div className="close-button" onClick={props.onToggleNav}>
          <CloseIcon />
        </div>
      </div>

      <div className="nav-body">
        <Link to="/" className="nav-link">
          <div className="nav-link-icon">
            <UserIcon />
          </div>
          Home
        </Link>

        {user && (
          <Link to="game" className="nav-link">
            <div className="nav-link-icon">
              <SquareQuestionIcon />
            </div>
            Play
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
          Leaderboard
        </Link>

        {user && (
          <Link to="settings" className="nav-link">
            <div className="nav-link-icon">
              <SettingsIcon />
            </div>
            Settings
          </Link>
        )}

        <Link to={user ? '/logout' : '/login'} className="nav-link">
          {user ? <LogoutIcon /> : <LoginIcon />}
          {user ? 'Logout' : 'Login'}
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Nav
