import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    country: '',
    phone: '',
    interests: '',
    terms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSignUpButtonClick = () => {
    // Aquí puedes acceder a los valores de formData y hacer lo que necesites, como enviarlos a un servidor
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to Know & Win!
      </Typography>
      <div className="content">
        <h1 className="thatstyle">Welcome to Know & Win!</h1>
        <p>Complete the following data to create your new account and start playing!</p>
        <div className="login-form">
          <h2>Sign up</h2>
          <div className="form-row">
            <TextField id="fullname" name="fullname" label="Full Name" fullWidth value={formData.fullname} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="email" name="email" label="Email" fullWidth required value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="username" name="username" label="Username" fullWidth required value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="password" name="password" label="Password" type="password" fullWidth required value={formData.password} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="confirm-password" name="confirmPassword" label="Confirm Password" type="password" fullWidth required value={formData.confirmPassword} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="dob" name="dob" label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <Select id="gender" name="gender" label="Gender" fullWidth value={formData.gender} onChange={handleInputChange}>
              <MenuItem value="" disabled>Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </div>
          <div className="form-row">
            <TextField id="country" name="country" label="Country" fullWidth value={formData.country} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="phone" name="phone" label="Phone Number" fullWidth value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <TextField id="interests" name="interests" label="Interests" fullWidth value={formData.interests} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <FormControlLabel
              control={<Checkbox id="terms" name="terms" required checked={formData.terms} onChange={handleInputChange} />}
              label="I agree to the"
            />
            <Link href="#">terms and conditions</Link>
          </div>
        </div>
        <Button variant="contained" className="signup-button" fullWidth onClick={handleSignUpButtonClick}>
          Sign up now
        </Button>
      </div>
    </Container>
  );
}

export default Register;
