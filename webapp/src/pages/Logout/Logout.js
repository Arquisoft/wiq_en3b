import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

function Logout() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return <div>Logout...</div>
}

export default Logout
