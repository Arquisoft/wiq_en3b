import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header/Header';
import { AuthProvider } from '../../context/AuthContext';
import { SettingsProvider } from '../../context/SettingsContext';
import '@testing-library/jest-dom';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useEffect: jest.fn(),
    };
});

describe('Header component', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SettingsProvider>
                        <Header theme="light" onChangeTheme={() => {}} onToggleNav={() => {}} />
                    </SettingsProvider>
                </AuthProvider>
            </BrowserRouter>
        );
    });

    it('calls onToggleNav prop when navigation element is clicked', () => {
        const onToggleNavMock = jest.fn();
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SettingsProvider>
                        <Header theme="light" onChangeTheme={() => {}} onToggleNav={onToggleNavMock} />
                    </SettingsProvider>
                </AuthProvider>
            </BrowserRouter>
        );

        const navigationElement = screen.getByTestId('navigation-element');
        fireEvent.click(navigationElement);
        expect(onToggleNavMock).toHaveBeenCalled();
    });

    it('calls onToggleNav prop when navigation element is focused and enter key is pressed', () => {
        const onToggleNavMock = jest.fn();

        render(
            <BrowserRouter>
                <AuthProvider>
                    <SettingsProvider>
                        <Header theme="light" onChangeTheme={() => {}} onToggleNav={onToggleNavMock} />
                    </SettingsProvider>
                </AuthProvider>
            </BrowserRouter>
        );

        const navigationElement = screen.getByTestId('navigation-element');
        navigationElement.focus();
        fireEvent.keyDown(navigationElement, { key: 'Enter' });
        expect(onToggleNavMock).toHaveBeenCalled();
    });

    it('calls onChangeTheme prop when theme element is clicked', () => {
        const onChangeThemeMock = jest.fn();
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SettingsProvider>
                        <Header theme="light" onChangeTheme={onChangeThemeMock} onToggleNav={() => {}} />
                    </SettingsProvider>
                </AuthProvider>
            </BrowserRouter>
        );

        const themeElement = screen.getByTestId('theme-element');
        fireEvent.click(themeElement);
        expect(onChangeThemeMock).toHaveBeenCalled();
    });

    it('calls onChangeTheme prop when theme element is focused and enter key is pressed', () => {
        const onChangeThemeMock = jest.fn();
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SettingsProvider>
                        <Header theme="light" onChangeTheme={onChangeThemeMock} onToggleNav={() => {}} />
                    </SettingsProvider>
                </AuthProvider>
            </BrowserRouter>
        );

        const themeElement = screen.getByTestId('theme-element');
        themeElement.focus();
        fireEvent.keyDown(themeElement, { key: 'Enter' });
        expect(onChangeThemeMock).toHaveBeenCalled();
    });
});
