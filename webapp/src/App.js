import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

//Components
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

//Pages
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Settings from "./pages/Settings/Settings";
import Home from "./pages/Home/Home";

const apiEndpoint = "http://20.117.173.161:8000";

function App() {
  //State for opening and closing the navigation
  const [openNav, setOpenNav] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [theme, setTheme] = useState("light");
  const [timerValue, setTimerValue] = useState(15);
  const [userstate, setUserState] = useState(null);

  useEffect(() => {
    (async () => {
      const questions = await getQuestions();
      setQuestions(questions);
    })();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);

  const toggleNavHandler = () => {
    setOpenNav(prevState => !prevState);
  };

  const changeThemeHandler = () => {
    setTheme(prevState => (prevState === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const changeTimerValueHandler = e => {
    setTimerValue(e.target.value);
  };

  const getQuestions = async () => {
    const response = await fetch(`${apiEndpoint}/questions?size=3`);
    const data = await response.json();

    data.forEach(question => {
      question.answers = shuffle(question.answers);
    });

    return data;
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  return (
    <div className={theme}>
      <Header
        onToggleNav={toggleNavHandler}
        onChangeTheme={changeThemeHandler}
        theme={theme}
        authenticated={!!userstate}
        onLogout={() => setUserState(null)}
      />

      <Nav openNav={openNav} onToggleNav={toggleNavHandler} />
      <main>
        <Routes>
          <Route
            path="/"
            element={userstate ? <Profile setUserState={setUserState} /> : <Navigate to="/login" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="game"
            element={userstate ? <Game quizData={questions} timerValue={timerValue} /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={userstate ? <Profile setUserState={setUserState} /> : <Navigate to="/login" />}
          />
          <Route
            path="leaderboard"
            element={userstate ? <Leaderboard /> : <Navigate to="/login" />}
          />
          <Route
            path="settings"
            element={userstate ? <Settings onChangeTimerValue={changeTimerValueHandler} timerValue={timerValue} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
