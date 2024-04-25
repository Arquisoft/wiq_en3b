import {Outlet} from 'react-router-dom'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import {useTheme} from '../hooks/useTheme'
import {useToggle} from '../hooks/useToggle'
import './cursor.css'
import Lottie from 'react-lottie'
import darkAnimationData from '../assets/catanimation/sleeping_cat.json';
import lightAnimationData from '../assets/catanimation/asleep_cat.json';




const AppLayout = ({volume}) => {
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
    //State for opening and closing the navigation
    const [nav, toggleNav] = useToggle(false);
    //State for the theme
    const {theme, changeThemeHandler} = useTheme();

    return (
        <div className={theme}>


            <Header
                onToggleNav={toggleNav}
                onChangeTheme={changeThemeHandler}
                theme={theme}
                volume={volume}
            />
            <Nav openNav={nav} onToggleNav={toggleNav}/>
            <main>
                <Outlet/>
                {theme === "dark" && (
                    <Lottie options={darkOptions} height={180} width={280} style={{ position: 'absolute', bottom: 20, right: 80 }} />
                )}
                {theme === "light" && (
                    <Lottie options={lightOptions} height={200} width={400} style={{ position: 'absolute', bottom: 12, right: 40 }} />
                )}

            </main>

        </div>
    )
}

export default AppLayout