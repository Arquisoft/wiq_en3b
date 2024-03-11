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
import data from "./assets/data.json"

function App() {
  //State for opening and closing the navigation
  const [openNav, setOpenNav] = useState(false)

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    console.log(questions)
      ; (async () => {
        const questions = await getQuestions()
        setQuestions(questions)
        console.log(questions)
      })()

    console.log(questions)
  }, [])

  //State for the theme
  const [theme, setTheme] = useState("light")

  //State for the timer value
  const [timerValue, setTimerValue] = useState(15)

  //Check if the theme is saved in the local storage
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"))
    }
  }, [theme])

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

  const changeTimerValueHandler = e => {
    setTimerValue(e.target.value)
  }

  const getQuestions = async () => {
    const response = await fetch((process.env.API_URI || 'http://localhost:8000') + "/questions?size=3")
    console.log(response)
    const data = await response.json()

    data.forEach(question => {
      question.answers = shuffle(question.answers)
    })

    return data
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ]
    }

    return array
  }

  return (
    <div className={theme}>
      <Header
        onToggleNav={toggleNavHandler}
        onChangeTheme={changeThemeHandler}
        theme={theme}
      />

      <Nav openNav={openNav} onToggleNav={toggleNavHandler} />

      <main>
        <Routes>
          <Route path="home" element={<Home />}></Route>
          <Route
            path="game"
            element={<Game quizData={questions} timerValue={timerValue} />}
          ></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="leaderboard" element={<Leaderboard />}></Route>
          <Route
            path="settings"
            element={
              <Settings
                onChangeTimerValue={changeTimerValueHandler}
                timerValue={timerValue}
              />
            }
          ></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
