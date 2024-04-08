import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from './Settings';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';


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
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

  it('renders the title correctly', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
    expect(screen.getByRole('heading')).toHaveTextContent('settings.title');
  });

  it('renders the volume slider', () => {
    const onChangeTimerValue = jest.fn();
    const timerValue = 30;

    render(<Settings onChangeTimerValue={onChangeTimerValue} timerValue={timerValue} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
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
