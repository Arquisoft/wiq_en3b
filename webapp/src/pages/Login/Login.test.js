import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

test('renders without crashing', () => {
    render(<Login />);
});

test('renders welcome message', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Welcome to Know and Win App, please login to procceed')).toBeInTheDocument();
});

test('renders login component', () => {
    const { getByTestId } = render(<Login />);
    // Asegúrate de que tu componente LoginComponent tenga un atributo data-testid
    // Por ejemplo: <div data-testid="login-component">...</div>
    expect(getByTestId('login-component')).toBeInTheDocument();
});