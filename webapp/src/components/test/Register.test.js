import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register/Register';
import { AuthContext } from '../../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

const mockRegister = jest.fn();

const mockUser = {
  username: "newUser",
  password: "newPassword"
};

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
          'register.passwords_not_match_error': 'Confirm password and password should be same',
        },
      },
    },
  })

const renderWithAuthAndRouter = (component) => {
    return render(
        <MemoryRouter>
            <I18nextProvider i18n={i18n}>
                <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                    {component}
                </AuthContext.Provider>
            </I18nextProvider>
        </MemoryRouter>
    );
};

const fireInputChangeEvent = (placeholder, value) => {
    fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
};

const fireClickEvent = (text) => {
    fireEvent.click(screen.getByText(text));
};

test('renders without crashing', () => {
    renderWithAuthAndRouter(<Register />)
});

test('renders welcome message', () => {
    renderWithAuthAndRouter(<Register />)
    expect(screen.getByText('Welcome to Know and Win App, fill the form to register your account')).toBeInTheDocument();
});

test('renders register component and calls register function on register button click', async () => {
    renderWithAuthAndRouter(<Register />);

    // Simulate user input
    fireInputChangeEvent('Username', 'testuser');
    fireInputChangeEvent('Password', 'testpassword');
    fireInputChangeEvent('Repeat Password', 'testpassword');

    // Click the register button
    fireClickEvent('Register');
});

test('shows error messages when form validation fails', async () => {
    renderWithAuthAndRouter(<Register />);

    // Simulate user input
    fireInputChangeEvent('Username', ''); // Leave username empty
    fireInputChangeEvent('Password', 'short'); // Password is too short
    fireInputChangeEvent('Repeat Password', 'notmatching'); // Repeat Password does not match Password

    // Click the register button
    fireClickEvent('Register');

    // Check that error messages are displayed
    await waitFor(() => {
        checkErrors();
    });

    function checkErrors(){
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
        expect(screen.getByText('Confirm password and password should be same')).toBeInTheDocument();
    }
});
