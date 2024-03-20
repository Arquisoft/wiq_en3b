import { useAuth } from '../../hooks/useAuth'

function Home() {
  const { user } = useAuth()

  return (
    <>
      <div>Home</div>
      {user ? (
        <>
          <div>{user.username}</div>
          <a href="/logout">Logout</a>
        </>
      ) : (
        <div>You need to login</div>
      )}
    </>
  )
}

export default Home
