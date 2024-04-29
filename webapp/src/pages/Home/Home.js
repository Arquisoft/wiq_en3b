import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Home.css'

import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme';

function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { t } = useTranslation()
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  

  return (
    <div className='homeDiv'>
      {user ? (
        <>
          <img className="App-logo" src={theme === 'light' ? "KaW.png" : "KaW_D.png"} alt="Logo of Know and Win APP" />
          <div className="welcome-message">
            {t("home.welcome")} <strong>{user.username}</strong>
          </div>
        </>
      ) : (
        <div>Please, login to play the game</div>
      )}

      <Link to="game" class="btn">
        <div class="swipe">{t("play.nav_title")}
          <span class="container">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none">
              </path>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor">
              </path>
            </svg>
          </span>
        </div>
      </Link>
    </div>
  )
}

export default Home
