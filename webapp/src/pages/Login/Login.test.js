import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../../context/AuthContext';

const mockUser = {
  username: "mateo2",
  password: "1234567891011"
};
const mockLogin = jest.fn();

test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
                <Login />
            </AuthContext.Provider>
        </MemoryRouter>
    );
});

test('renders welcome message', () => {
    const { getByText } = render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
                <Login />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(getByText('Welcome to Know and Win App, please login to procceed')).toBeInTheDocument();
});

test('renders login component', () => {
    const { getByPlaceholderText } = render(
        <MemoryRouter>
            <AuthContext.Provider value={{ user: mockUser, login: mockLogin }}>
                <Login />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
});