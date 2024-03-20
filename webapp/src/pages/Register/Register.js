import AddUser from '../../components/AddUser/AddUser'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const navigateToLoginPage = () => {
    navigate('/login')
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
      <AddUser />
      <Typography component="div" align="center">
        <Link
          name="gotoregister"
          component="button"
          variant="body2"
          onClick={navigateToLoginPage}
        >
          Don't have an account? Register here.
        </Link>
      </Typography>
    </Container>
  )
}

export default Register
