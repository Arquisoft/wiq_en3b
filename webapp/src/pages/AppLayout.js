import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import { useTheme } from '../hooks/useTheme'
import { useToggle } from '../hooks/useToggle'
import './cursor.css'
import Lottie from 'react-lottie'
import darkAnimationData from '../lotties/sleeping_cat.json';
import lightAnimationData from '../lotties/asleep_cat.json';

const AppLayout = ({ volume }) => {
    //State for opening and closing the navigation
    const [nav, toggleNav] = useToggle(false)
    //State for the theme
    const { theme, changeThemeHandler } = useTheme()

    const darkOptions = {
        loop: true,
        autoplay: true,
        animationData: darkAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const lightOptions = {
        loop: true,
        autoplay: true,
        animationData: lightAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={theme}>

            <Header
                onToggleNav={toggleNav}
                onChangeTheme={changeThemeHandler}
                theme={theme}
                volume={volume}
            />

            <Nav openNav={nav} onToggleNav={toggleNav}/>
            <div>
                {theme === "dark" && (
                    <Lottie
                        options={darkOptions}
                        height={180}
                        width={280}
                        style={{position: 'absolute', bottom: 20, right: 80}}
                    />
                )}
                {theme === "light" && (
                    <Lottie
                        options={lightOptions}
                        height={200}
                        width={400}
                        style={{position: 'absolute', bottom: 12, right: 40}}
                    />
                )}
            </div>

            <main>
                <Outlet/>

            </main>
        </div>
    )
}

export default AppLayout