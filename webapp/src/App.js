import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

//Components
import Header from "./components/Header/Header"
import Nav from "./components/Nav/Nav"

//Pages
import Game from "./pages/Game/Game"
import Profile from "./pages/Profile/Profile"
import Leaderboard from "./pages/Leaderboard/Leaderboard"
import Settings from "./pages/Settings/Settings"
import Home from "./pages/Home/Home"



import { useTranslation } from "react-i18next";

function App() {

  //State for opening and closing the navigation
  const [openNav, setOpenNav] = useState(false)
  //State for the theme
  const [theme, setTheme] = useState("light")
  //State for the sound
  const [sound, setSound] = useState("on")
  //State for the timer value
  const [timerValue, setTimerValue] = useState(15)
  //Translation
  const { t } = useTranslation();

  //Check if the theme is saved in the local storage
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"))
    }
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem("sound")) {
      setSound(localStorage.getItem("sound"))
    }
  }, [sound])

  //Function to open and close the navigation
  const toggleNavHandler = () => {
    setOpenNav(prevState => {
      return !prevState
    })
  }

  const changeThemeHandler = () => {
    setTheme(prevState => {
      return prevState === "light" ? "dark" : "light"
    })

    localStorage.setItem("theme", theme === "light" ? "dark" : "light")
  }

  const changeSoundHandler = () => {
    setSound(prevState => {
      return prevState === "on" ? "off" : "on"
    })

    localStorage.setItem("sound", theme === "on" ? "off" : "on")
  }

  const changeTimerValueHandler = e => {
    setTimerValue(e.target.value)
  }



  return (
    <div className={theme}>

      <Header onToggleNav={toggleNavHandler} onChangeTheme={changeThemeHandler} onChangeSound={changeSoundHandler} theme={theme} sound={sound} />

      <Nav openNav={openNav} onToggleNav={toggleNavHandler} />

      <main>
        <Routes>
          <Route path="home" element={<Home />}></Route>
          <Route path="game" element={<Game timerValue={timerValue} />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="leaderboard" element={<Leaderboard />}></Route>
          <Route path="settings" element={<Settings onChangeTimerValue={changeTimerValueHandler} timerValue={timerValue} />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
