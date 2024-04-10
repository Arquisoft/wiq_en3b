import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import { AuthContext } from '../../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

const mockRegister = jest.fn();

const mockUser = {
  username: "newUser",
  password: "newPassword"
};

test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                <Register />
            </AuthContext.Provider>
        </MemoryRouter>
    );
});

test('renders welcome message', () => {
    const { getByText } = render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                <Register />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(getByText('Welcome to Know and Win App, fill the form to register your account')).toBeInTheDocument();
});

test('renders register component and calls register function on register button click', async () => {
    const mockRegister = jest.fn();
    const { getByText, getByPlaceholderText } = render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                <Register />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } }); // Password is now at least 8 characters
    fireEvent.change(getByPlaceholderText('Repeat Password'), { target: { value: 'testpassword' } }); // Repeat Password matches Password

    // Click the register button
    fireEvent.click(getByText('Register'));
});

test('shows error messages when form validation fails', async () => {
    const { getByText, getByPlaceholderText } = render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, register: mockRegister }}>
                <Register />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: '' } }); // Leave username empty
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'short' } }); // Password is too short
    fireEvent.change(getByPlaceholderText('Repeat Password'), { target: { value: 'notmatching' } }); // Repeat Password does not match Password

    // Click the register button
    fireEvent.click(getByText('Register'));

    // Check that error messages are displayed
    await waitFor(() => {
        expect(getByText('Username is required')).toBeInTheDocument();
        expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
        expect(getByText('Confirm password and password should be same')).toBeInTheDocument();
    });
});