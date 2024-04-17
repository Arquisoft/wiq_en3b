import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LoginComponent from '../../components/Login/Login'

import { useTranslation } from "react-i18next";

function Login() {

  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{
          marginTop: 2,
          marginBottom: 8,
          fontSize: '2rem',
          fontFamily: 'Courier New, Courier, monospace'
        }}
      >
        {t("login.welcome")}
      </Typography>
      <LoginComponent />
    </Container>
  )
}

export default Login
