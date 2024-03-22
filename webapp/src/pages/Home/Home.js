import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Home() {
  const { user } = useAuth()

  return (
    <>
      <div>Home</div>
      {user ? (
        <>
          <div>{user.username}</div>
          <Link to={'/logout'}>Logout</Link>
        </>
      ) : (
        <div>You need to login</div>
      )}
    </>
  )
}

export default Home
