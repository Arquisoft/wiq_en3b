import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Імпортуємо BrowserRouter
import AddUser from '../AddUser/AddUser';

jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
        user: {},
    }),
}));

test('validates registration form', async () => {
    render(
        <Router>
            <AddUser />
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
