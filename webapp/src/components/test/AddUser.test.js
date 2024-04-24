import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Імпортуємо BrowserRouter
import AddUser from '../AddUser/AddUser';
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
        user: {},
    }),
}));

i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'register.username_placeholder': 'Username',
          'register.password_placeholder': 'Password',
          'register.password_confirm_placeholder': 'Repeat Password',
          'register.welcome':
            'Welcome to Know and Win App, fill the form to register your account',
          'register.button': 'Register',
          'register.empty_username_error': 'Username is required',
          'register.password_length_error': 'Password must be at least 8 characters',
          'register.empty_password_confirm_error': 'Confirm Password is required',
          'register.passwords_not_match_error': 'Confirm password and password should be same',
        },
      },
    },
  })

test('validates registration form', async () => {
    render(
        <Router>
            <I18nextProvider i18n={i18n}>
                <AddUser />
            </I18nextProvider>
        </Router>
    );
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByRole('button', { name: /Register/i });

    // Trigger form submission without filling inputs
    fireEvent.click(registerButton);

    // Check for validation errors
    await screen.findByText(/Username is required/i);
    await screen.findByText(/Confirm Password is required/i);

    // Fill in inputs with invalid data
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    fireEvent.click(registerButton);

    // Check for validation errors
    await screen.findByText(/Password must be at least 8 characters/i);
});
