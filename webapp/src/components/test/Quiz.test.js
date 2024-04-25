import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../Quiz/Quiz';

jest.mock('../../hooks/useAuth', () => ({
    useAuth: () => ({
        user: { token: 'fake-token' },
    }),
}));

describe('Quiz component', () => {
    test('renders quiz timer and question', async () => {
        render(<Quiz level="easy" />);

        await waitFor(() => {
            const timerElement = screen.getByTestId('quiz-timer');
            expect(timerElement).toBeTruthy();
        });

        await waitFor(() => {
            const questionElement = screen.getByTestId('quiz-question-1');
            expect(questionElement).toBeTruthy();
        });
    });

    test('selects answer and displays next question', async () => {
        render(<Quiz level="easy" />);

        await waitFor(() => {
            const questionElement = screen.getByTestId('quiz-question-1');
            expect(questionElement).toBeTruthy();
        });

        // Simulate selecting an answer (adapt as needed based on your implementation)
        fireEvent.click(screen.getByText('Your Answer Text'));

        await waitFor(() => {
            const nextQuestionElement = screen.getByTestId('quiz-question-2');
            expect(nextQuestionElement).toBeTruthy();
        });
    });

    test('displays final result when all questions are answered', async () => {
        render(<Quiz level="easy" />);

        await waitFor(() => {
            const questionElement = screen.getByTestId('quiz-question-1');
            expect(questionElement).toBeTruthy(); // Assuming activeQuizIndex starts from 1
        });

        // Simulate selecting answers for all questions
        fireEvent.click(screen.getByText('Your Answer Text')); // Repeat for each question

        // Wait for final result to be displayed
        await waitFor(() => {
            const finalResultElement = screen.getByTestId('final-result');
            expect(finalResultElement).toBeTruthy();
        });
    });
});
