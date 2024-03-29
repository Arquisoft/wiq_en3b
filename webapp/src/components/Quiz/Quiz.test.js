import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';
import '@testing-library/jest-dom'

describe('Quiz component', () => {
  const mockQuizData = [
    {
      question: 'What is the capital of France?',
      answers: [
        { id: 1, text: 'Paris' },
        { id: 2, text: 'Berlin' },
        { id: 3, text: 'Madrid' },
        { id: 4, text: 'Rome' }
      ],
      correctAnswerId: 1
    }
  ];

  it('renders quiz with countdown timer', () => {
    const { getByText } = render(<Quiz quizData={mockQuizData} timerValue={10} />);
    const countdownTimer = getByText(/\d{2}:\d{2}/);
    expect(countdownTimer).toBeInTheDocument();
  });

  it('displays quiz question and answers', () => {
    const { getByText } = render(<Quiz quizData={mockQuizData} timerValue={10} />);
    const question = getByText('What is the capital of France?');
    expect(question).toBeInTheDocument();
    const answer1 = getByText('Paris');
    expect(answer1).toBeInTheDocument();
    const answer2 = getByText('Berlin');
    expect(answer2).toBeInTheDocument();
    const answer3 = getByText('Madrid');
    expect(answer3).toBeInTheDocument();
    const answer4 = getByText('Rome');
    expect(answer4).toBeInTheDocument();
    
  });
});
