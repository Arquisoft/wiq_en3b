import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className='homeDiv'>
      {user ? (
        <>
          <img className="App-logo" src="KaW.png" alt="Logo of Know and Win APP" />
          <div className="welcome-message">
            Welcome back, <span className="username">{user.username}</span>!
          </div>
        </>
      ) : (
        <div>Please, login to play the game</div>
      )}
    </div>
  )
}

export default Home
