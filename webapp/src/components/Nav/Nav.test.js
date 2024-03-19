import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Nav from './Nav';
import '@testing-library/jest-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

describe('Nav component', () => {
    it ('renders Nap without crashing', () => {

        render (<BrowserRouter>
        <Routes>
            <Route path="/" element={< Nav openNav={true} onToggleNav={() => {}} />}></Route>
        </Routes>
        </BrowserRouter>)
        expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
        expect(screen.getByText(/Play/i)).toBeInTheDocument();
    })
})