import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import { useTheme } from '../hooks/useTheme'
import { useToggle } from '../hooks/useToggle'

function AppLayout() {
  const [nav, toggleNav] = useToggle(false)
  const { theme, changeThemeHandler } = useTheme()

  return (
    <div className={theme}>
      <Header
        onToggleNav={toggleNav}
        onChangeTheme={changeThemeHandler}
        theme={theme}
      />

      <Nav openNav={nav} onToggleNav={toggleNav} />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
