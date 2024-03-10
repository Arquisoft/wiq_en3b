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
import './style.css';

const Register = () => {
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSignUpButtonClick = () => {
    console.log(formData);
  };

  return (
    React.createElement(Container, { component: "main", maxWidth: "xs" },
      React.createElement(CssBaseline, null),
      React.createElement(Typography, { component: "h1", variant: "h5", align: "center", sx: { marginTop: 2 } }, "Welcome to Know & Win!"),
      React.createElement('div', { className: "content" },
        React.createElement('h1', { className: "thatstyle" }, 'Welcome to Know & Win!'),
        React.createElement('p', null, 'Complete the following data to create your new account and start playing!'),
        React.createElement('div', { className: "login-form" },
          React.createElement('h2', null, 'Sign up'),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "fullname", name: "fullname", label: "Full Name", fullWidth: true, value: formData.fullname, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "email", name: "email", label: "Email", fullWidth: true, required: true, value: formData.email, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "username", name: "username", label: "Username", fullWidth: true, required: true, value: formData.username, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "password", name: "password", label: "Password", type: "password", fullWidth: true, required: true, value: formData.password, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "confirm-password", name: "confirmPassword", label: "Confirm Password", type: "password", fullWidth: true, required: true, value: formData.confirmPassword, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "dob", name: "dob", label: "Date of Birth", type: "date", fullWidth: true, InputLabelProps: { shrink: true }, value: formData.dob, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(Select, { id: "gender", name: "gender", label: "Gender", fullWidth: true, value: formData.gender, onChange: handleInputChange },
              React.createElement(MenuItem, { value: "", disabled: true }, 'Gender'),
              React.createElement(MenuItem, { value: "male" }, 'Male'),
              React.createElement(MenuItem, { value: "female" }, 'Female'),
              React.createElement(MenuItem, { value: "other" }, 'Other')
            )
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "country", name: "country", label: "Country", fullWidth: true, value: formData.country, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "phone", name: "phone", label: "Phone Number", fullWidth: true, value: formData.phone, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(TextField, { id: "interests", name: "interests", label: "Interests", fullWidth: true, value: formData.interests, onChange: handleInputChange })
          ),
          React.createElement('div', { className: "form-row" },
            React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { id: "terms", name: "terms", required: true, checked: formData.terms, onChange: handleInputChange }), label: "I agree to the" }),
            React.createElement(Link, { href: "#" }, 'terms and conditions')
          )
        ),
        React.createElement(Button, { variant: "contained", className: "signup-button", fullWidth: true, onClick: handleSignUpButtonClick }, 'Sign up now')
      )
    )
  );
}

export default Register;
