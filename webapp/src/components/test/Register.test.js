import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register/Register';
import { AuthContext } from '../../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

const mockRegister = jest.fn();

const mockUser = {
  username: "newUser",
  password: "newPassword"
};

const renderWithAuthAndRouter = (component) => {
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                {component}
            </AuthContext.Provider>
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
