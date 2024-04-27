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
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import { ProtectedRoute } from './components/ProtectedRoute'

import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'

import { useState } from 'react'

function App() {

    //State for the volume
    const [volume, setVolume] = useState(10);

    const handleVolumeChange = (event, newVolume) => {
        setVolume(newVolume);
    };

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
                                    <Game />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route path="profile/:username?" element={<Profile />} />
                        <Route path="leaderboard" element={<Leaderboard />}></Route>
                        <Route path="settings" element={<Settings volume={volume} handleVolumeChange={handleVolumeChange} />}></Route>
                    </Route>
                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />
                </Routes>
            </AuthProvider>
        </SettingsProvider>
    )

}

export default App