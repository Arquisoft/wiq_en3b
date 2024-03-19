import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom'

describe('Button component', () => {
    it ('renders without crashing', () => {
        render(<Button>Hello!</Button>)

        expect(screen.getByText(/Hello!/i)).toBeInTheDocument();
    })
})