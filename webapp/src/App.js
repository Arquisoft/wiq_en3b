import { Route, Routes } from 'react-router-dom'

import Game from './pages/Game/Game'
import Profile from './pages/Profile/Profile'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Home from './pages/Home/Home'
import AppLayout from './pages/AppLayout'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Register from './pages/Register/Register'

import { ProtectedRoute } from './components/ProtectedRoute'

import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'


function App() {

  //State for the timer value
  const [timerValue, setTimerValue] = useState(100000)
  //State for the volume
  const [volume, setVolume] = useState(10);
  //Translation
  const { t } = useTranslation();

  const handleVolumeChange = (event, newVolume) => {
    console.log(newVolume)
    setVolume(newVolume);
  };

  const changeTimerValueHandler = e => {
    setTimerValue(e.target.value)
  }

  return (
    <SettingsProvider>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout volume={volume} />}>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />} />
            <Route
              path="game"
              element={
                <ProtectedRoute>
                  <Game timerValue={timerValue} />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route path="settings" element={<Settings volume={volume} handleVolumeChange={handleVolumeChange} onChangeTimerValue={changeTimerValueHandler} timerValue={timerValue} />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </SettingsProvider>
  )

}

export default App
