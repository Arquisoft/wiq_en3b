import AddUser from '../../components/AddUser/AddUser'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ marginTop: 2, 
          marginBottom: 8,
          fontSize: '2rem',
          fontFamily: 'Courier New, Courier, monospace'
         }}
      >
        Welcome to Know and Win App, fill the form to register your account
      </Typography>
      <AddUser />
    </Container>
  )
}

export default Register
