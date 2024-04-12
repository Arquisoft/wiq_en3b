import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Nav from '../Nav/Nav';
import '@testing-library/jest-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { runI18n } from './utils/i18n.test-utils';

jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
        user: {}, // or whatever user object you want to use in your test
    }),
}));

describe('Nav component', () => {
    beforeAll(() => {
        runI18n()
      })

    it('renders Nav without crashing', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Nav openNav={true} onToggleNav={() => {}} />} />
                </Routes>
            </BrowserRouter>
        );

        // Check if the elements are rendered
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Play/i)).toBeInTheDocument();
        expect(screen.getByText(/Profile/i)).toBeInTheDocument();
        expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();

        // Simulate navigation toggle
        const closeButton = document.querySelector('.close-button');
        fireEvent.click(closeButton);
    });

});

