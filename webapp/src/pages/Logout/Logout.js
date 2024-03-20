import { useAuth } from '../../hooks/useAuth'

function Logout() {
  const { logout } = useAuth()

  logout()

  return <div>Logout...</div>
}

export default Logout
