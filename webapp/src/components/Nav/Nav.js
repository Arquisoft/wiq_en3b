import './Nav.css'

import { Link } from 'react-router-dom'

import { ReactComponent as CloseIcon } from '../../assets/xmark-solid.svg'
import { ReactComponent as SquareQuestionIcon } from '../../assets/square-question.svg'
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { ReactComponent as AwardIcon } from '../../assets/award-solid.svg'
import { ReactComponent as SettingsIcon } from '../../assets/gear-solid.svg'

const Nav = props => {
  return (
    <div className={`nav ${props.openNav ? 'show' : ''}`}>
      <div className="nav-header">
        <div className="close-button" onClick={props.onToggleNav}>
          <CloseIcon />
        </div>
      </div>

      <div className="nav-body">
        <Link to="" className="nav-link">
          <div className="nav-link-icon">
            <UserIcon />
          </div>
          Home
        </Link>

        <Link to="game" className="nav-link">
          <div className="nav-link-icon">
            <SquareQuestionIcon />
          </div>
          Play
        </Link>

        <Link to="profile" className="nav-link">
          <div className="nav-link-icon">
            <UserIcon />
          </div>
          Profile
        </Link>

        <Link to="leaderboard" className="nav-link">
          <div className="nav-link-icon">
            <AwardIcon />
          </div>
          Leaderboard
        </Link>

        <Link to="settings" className="nav-link">
          <div className="nav-link-icon">
            <SettingsIcon />
          </div>
          Settings
        </Link>
      </div>
    </div>
  )
}

export default Nav
