// src/components/AddUser.js
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button } from '@mui/material'
import { API_ENDPOINT } from '../../utils/constants'
import { useAuth } from '../../hooks/useAuth'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const addUser = async () => {
    try {
      await axios.post(`${API_ENDPOINT}/adduser`, {
        username,
        password,
      })

      const response = await axios.post(`${API_ENDPOINT}/login`, {
        username,
        password,
      })

      const { username: user, token } = response.data.data.user

      const obj = {
        username: user,
        token,
      }

      console.log(obj)

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
      <Typography component="h1" variant="h5">
        Add User
      </Typography>
      <TextField
        name="username"
        margin="normal"
        fullWidth
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        name="password"
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addUser}>
        Add User
      </Button>
      {error && <p style={{ color: '#7b0c0c' }}>Error: {error}</p>}
    </Container>
  )
}

export default AddUser
