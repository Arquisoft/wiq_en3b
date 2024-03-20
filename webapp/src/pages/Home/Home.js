import { useAuth } from '../../hooks/useAuth'

function Home() {
  const { user } = useAuth()

  return (
    <>
      <div>Inicio</div>
      {user ? (
        <div>{user.username}</div>
      ) : (
        <div>La sesión no ha sido iniciada</div>
      )}
    </>
  )
}

export default Home
