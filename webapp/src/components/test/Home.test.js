import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from '../../pages/Home/Home';
import '@testing-library/jest-dom/extend-expect';

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
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    );

    // Espera a que se complete el efecto secundario en Home
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(screen.getByText('Login Page')).toBeInTheDocument();
});