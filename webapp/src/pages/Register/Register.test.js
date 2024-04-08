import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

test('renders without crashing', () => {
    render(<Register />);
});

test('renders welcome message', () => {
    const { getByText } = render(<Register />);
    expect(getByText('Welcome to Know and Win App, fill the form to register your account')).toBeInTheDocument();
});

test('renders AddUser component', () => {
    const { getByTestId } = render(<Register />);
    // Asegúrate de que tu componente AddUser tenga un atributo data-testid
    // Por ejemplo: <div data-testid="add-user-component">...</div>
    expect(getByTestId('add-user-component')).toBeInTheDocument();
});