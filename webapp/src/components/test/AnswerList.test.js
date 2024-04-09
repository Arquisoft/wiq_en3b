import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerList from '../Answer/AnswerList';

describe('AnswerList component', () => {
  it('calls onSelectAnswer with the correct answer ID when an answer is clicked', () => {
    // Arrange
    const answers = [
      { id: 'answer1', text: 'Answer 1' },
      { id: 'answer2', text: 'Answer 2' },
      { id: 'answer3', text: 'Answer 3' },
      { id: 'answer4', text: 'Answer 4' },
    ];
    const onSelectAnswerMock = jest.fn();
    const selectedAnswerId = 'answer2'; // Set the selected answer ID

    // Act
    render(
        <AnswerList
            answers={answers}
            onSelectAnswer={onSelectAnswerMock}
            selected={selectedAnswerId}
            btnDisabled={false}
        />
    );
    const selectedAnswer = screen.getByText('Answer 2');
    fireEvent.click(selectedAnswer);

    // Assert
    expect(onSelectAnswerMock).toHaveBeenCalledWith('answer2');
  });
});
