import { createContext, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = useCallback(
    async data => {
      setUser(data)
      navigate('/')
    },
    [navigate, setUser]
  )

  const logout = useCallback(() => {
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate, setUser])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
