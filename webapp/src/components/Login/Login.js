// src/components/Login.js
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { API_ENDPOINT } from '../../utils/constants'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const loginUser = async () => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/login`, {
        username,
        password,
      })

      const { username: user, token } = response.data.data.user

      const obj = {
        username: user,
        token,
      }

      login(obj)
    } catch (error) {
      const status = error.response.data.status

      if (status === 'error') {
        setError(error.response.data.error)
      } else {
        setError(error.response.data.data.error)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={loginUser}>
          Login
        </Button>
        {error && <p style={{ color: '#7b0c0c' }}>Error: {error}</p>}
      </div>
    </Container>
  )
}

export default Login
