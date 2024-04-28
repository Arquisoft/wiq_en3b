import React from 'react';
import { render, screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-lottie');

describe('PageNotFound component', () => {
    test('renders the heading and paragraph correctly', () => {
        render(<PageNotFound />);
        const headingElement = screen.getByText(/Oops.../i);
        const paragraphElement = screen.getByText(/It seems you've reached a page that's lost in cyberspace/i); // Use screen.getByText
        expect(headingElement).toBeInTheDocument();
        expect(paragraphElement).toBeInTheDocument();
    });

    test('renders the animation container correctly', () => {
        render(<PageNotFound />);
        const animationContainer = screen.getByTestId('animation-container');
        expect(animationContainer).toBeInTheDocument();
    });

});
