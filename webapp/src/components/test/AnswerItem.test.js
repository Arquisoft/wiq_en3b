import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerItem from '../Answer/AnswerItem';
import '@testing-library/jest-dom';

describe('AnswerItem component', () => {
  it('renders with correct class based on selected and correct answers', () => {
    const correctId = 'correct_id';
    const selectedId = 'selected_id';
    const answer = { id: 'answer_id' };
    const onSelectAnswerMock = jest.fn();

    // Render AnswerItem with different props combinations
    const { container, rerender } = render(
        <AnswerItem
            answer={answer}
            selected={{ correctId, selectedId }}
            btnDisabled={false}
            onSelectAnswer={onSelectAnswerMock}
        >
          Answer
        </AnswerItem>
    );

    // Initial render should not have any class
    expect(container.firstChild).toHaveClass('answer-item');

    // Re-render with correctId to simulate correct answer
    rerender(
        <AnswerItem
            answer={{ id: correctId }}
            selected={{ correctId, selectedId }}
            btnDisabled={false}
            onSelectAnswer={onSelectAnswerMock}
        >
          Answer
        </AnswerItem>
    );
    expect(container.firstChild).toHaveClass('answer-item success');

    // Re-render with selectedId to simulate selected answer
    rerender(
        <AnswerItem
            answer={{ id: selectedId }}
            selected={{ correctId, selectedId }}
            btnDisabled={false}
            onSelectAnswer={onSelectAnswerMock}
        >
          Answer
        </AnswerItem>
    );
    expect(container.firstChild).toHaveClass('answer-item error');
  });

  it('calls onSelectAnswer prop when answer item is clicked', () => {
    const answer = { id: 'answer_id' };
    const onSelectAnswerMock = jest.fn();
    render(
        <AnswerItem
            answer={answer}
            selected={{ correctId: 'correct_id', selectedId: 'selected_id' }}
            btnDisabled={false}
            onSelectAnswer={onSelectAnswerMock}
        >
          Answer
        </AnswerItem>
    );
    const answerItem = screen.getByText('Answer');
    fireEvent.click(answerItem);
    expect(onSelectAnswerMock).toHaveBeenCalledWith(answer.id);
  });

  it('does not call onSelectAnswer prop when button is disabled', () => {
    const answer = { id: 'answer_id' };
    const onSelectAnswerMock = jest.fn();
    render(
        <AnswerItem
            answer={answer}
            selected={{ correctId: 'correct_id', selectedId: 'selected_id' }}
            btnDisabled={true}
            onSelectAnswer={onSelectAnswerMock}
        >
          Answer
        </AnswerItem>
    );
    const answerItem = screen.getByText('Answer');
    fireEvent.click(answerItem);
    expect(onSelectAnswerMock).not.toHaveBeenCalled();
  });
});
