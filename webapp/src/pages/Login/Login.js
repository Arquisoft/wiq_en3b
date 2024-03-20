import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LoginComponent from '../../components/Login/Login'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const navigateToSignupPage = () => {
    navigate('/register')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ marginTop: 2 }}
      >
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      <LoginComponent />
      <Typography component="div" align="center">
        <Link component="button" variant="body2" onClick={navigateToSignupPage}>
          Already have an account? Login here.
        </Link>
      </Typography>
    </Container>
  )
}

export default Login
