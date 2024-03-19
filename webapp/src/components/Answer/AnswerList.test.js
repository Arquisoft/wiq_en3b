import React from 'react';
import { render } from '@testing-library/react';
import AnswerList from './AnswerList';
import '@testing-library/jest-dom'

describe('AnswerList component', () => {
  it('renders correctly with list of answers', () => {
    const answers = [
      { id: 'answer1', text: 'Answer 1' },
      { id: 'answer2', text: 'Answer 2' },
      { id: 'answer3', text: 'Answer 3' },
      { id: 'answer4', text: 'Answer 4' },
    ];
    const onSelectAnswerMock = jest.fn();
    const selected = { correctId: 'answer1', selectedId: 'answer2' };
    const { getAllByRole } = render(
      <AnswerList
        answers={answers}
        onSelectAnswer={onSelectAnswerMock}
        selected={selected}
        btnDisabled={false}
      />
    );

    // Check if correct number of answer items are rendered
    const answerItems = getAllByRole('listitem');
    expect(answerItems.length).toBe(answers.length);

    // Check if each answer item is rendered with correct text
    answers.forEach((answer, index) => {
      expect(answerItems[index]).toHaveTextContent(answer.text);
    });
  });

});
