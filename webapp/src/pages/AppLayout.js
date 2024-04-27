import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import { useTheme } from '../hooks/useTheme'
import { useToggle } from '../hooks/useToggle'
import './cursor.css'

const AppLayout = ({ volume }) => {
    //State for opening and closing the navigation
    const [nav, toggleNav] = useToggle(false)
    //State for the theme
    const { theme, changeThemeHandler } = useTheme()

    return (
        <div className={theme}>

            <Header
                onToggleNav={toggleNav}
                onChangeTheme={changeThemeHandler}
                theme={theme}
                volume={volume}
            />

            <Nav openNav={nav} onToggleNav={toggleNav} />

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout