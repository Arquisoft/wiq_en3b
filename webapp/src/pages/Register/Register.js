import AddUser from '../../components/AddUser/AddUser'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { useTranslation } from "react-i18next";

function Register() {

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
        {t("register.welcome")}
      </Typography>
      <AddUser />
    </Container>
  )
}

export default Register
