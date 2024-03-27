import { Route, Routes } from 'react-router-dom'

import Game from './pages/Game/Game'
import Profile from './pages/Profile/Profile'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Home from './pages/Home/Home'
import AppLayout from './pages/AppLayout'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Logout from './pages/Logout/Logout'
import { SettingsProvider } from './context/SettingsContext'

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />} />
            <Route
              path="game"
              element={
                <ProtectedRoute>
                  <Game />
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
            <Route path="settings" element={<Settings />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </SettingsProvider>
  )
}

export default App
