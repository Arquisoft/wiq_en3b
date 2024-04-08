import React from 'react';
import { render, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from './Home';

test('renders without crashing', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <Home />
            </AuthProvider>
        </MemoryRouter>
    );
});

test('redirects to login page if user is not authenticated', async () => {
    const { queryByText } = render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <Route path="/login">
                    <div>Login Page</div>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </AuthProvider>
        </MemoryRouter>
    );

    // Espera a que se complete el efecto secundario en Home
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(queryByText('Login Page')).toBeInTheDocument();
});

test('displays welcome message if user is authenticated', async () => {
    const { queryByText } = render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider value={{ user: { username: 'testuser' } }}>
                <Home />
            </AuthProvider>
        </MemoryRouter>
    );

    // Espera a que se complete el efecto secundario en Home
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(queryByText('Welcome back, testuser!')).toBeInTheDocument();
});