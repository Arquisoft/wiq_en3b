import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Settings from './Settings';

describe('Settings component', () => {
  it('renders without crashing', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
  });

  it('calls onChangeTimerValue prop when select value changes', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;
    const { getByLabelText } = render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
    const selectElement = getByLabelText('Change timer second');

    fireEvent.change(selectElement, { target: { value: '40' } });

    expect(onChangeTimerValue).toHaveBeenCalledTimes(1);
    expect(onChangeTimerValue).toHaveBeenCalledWith(expect.any(Object));
  });
});
