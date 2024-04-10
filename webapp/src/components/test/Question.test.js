import React from 'react';
import { render, screen } from '@testing-library/react';
import Question from '../Quiz/Question';
import '@testing-library/jest-dom'

describe('Question component', () => {
    const mockProps = {
        activeQuizIndex: 1,
        quizLength: 10,
        quiz: {
            question: 'What is the capital of France?',
            image: 'paris.jpg',
            answers: [
                { id: 1, text: 'London', correct: false },
                { id: 2, text: 'Paris', correct: true },
                { id: 3, text: 'Berlin', correct: false },
                { id: 4, text: 'Rome', correct: false },
            ],
        },
        btnDisabled: false,
        onSelectAnswer: jest.fn(),
        selected: { correctId: null, selectedId: null },
    };

    it('renders question text', () => {
        render(<Question {...mockProps} />);
        expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    });

    it('renders quiz image if provided', () => {
        render(<Question {...mockProps} />);
        expect(screen.getByAltText('Question')).toBeInTheDocument();
    });

    it('renders answer list', () => {
        render(<Question {...mockProps} />);
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('displays question counter', () => {
        render(<Question {...mockProps} />);
        expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
    });
});
