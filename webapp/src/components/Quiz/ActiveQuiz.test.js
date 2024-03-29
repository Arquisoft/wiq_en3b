import React from 'react';
import { render } from '@testing-library/react';
import ActiveQuiz from './ActiveQuiz';
import '@testing-library/jest-dom'

describe('ActiveQuiz component', () => {
  it('renders with correct quiz information', () => {
    const props = {
      activeQuizIndex: 1,
      quizLength: 5,
      quiz: {
        question: 'What is the capital of France?',
        answers: [
          { id: 1, text: 'Paris' },
          { id: 2, text: 'Berlin' },
          { id: 3, text: 'Madrid' },
          { id: 4, text: 'Rome' }
        ]
      },
      btnDisabled: false,
      selected: {
        correctId: null,
        selectedId: null
      },
      onSelectAnswer: jest.fn()
    };

    const { getByText } = render(<ActiveQuiz {...props} />);

    const question = getByText('What is the capital of France?');
    expect(question).toBeInTheDocument();

    const answer1 = getByText('Paris');
    expect(answer1).toBeInTheDocument();

    const answer2 = getByText('Berlin');
    expect(answer2).toBeInTheDocument();

  });
});
