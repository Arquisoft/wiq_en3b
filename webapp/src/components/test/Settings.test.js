import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from '../../pages/Settings/Settings';
import '@testing-library/jest-dom'


describe('Settings component', () => {
  it('renders without crashing', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
  });

  it('renders language options correctly', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('Español')).toBeTruthy();
    expect(screen.getByText('Français')).toBeTruthy();
  });

  it('renders the title correctly', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);

    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();

    expect(titleElement.textContent).toBe('settings.title');
  });

  it('renders the volume slider', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
    expect(screen.getByRole('slider')).toBeTruthy();
  });

  it('passes props to volume slider', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;
    const volume = 50;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} volume={volume} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

});
