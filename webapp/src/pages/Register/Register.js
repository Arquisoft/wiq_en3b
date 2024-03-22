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
        sx={{ marginTop: 2, marginBottom: 8 }}
      >
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      <AddUser />
    </Container>
  )
}

export default Register
