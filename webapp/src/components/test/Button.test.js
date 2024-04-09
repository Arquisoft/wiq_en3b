import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../Button/Button';
import '@testing-library/jest-dom'

describe('Button component', () => {
    it ('renders without crashing', () => {
        render(<Button>Hello!</Button>)

        expect(screen.getByText(/Hello!/i)).toBeInTheDocument();
    })
})

it('calls onClick prop when button is clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    fireEvent.click(screen.getByText(/Click me/i));

    expect(onClickMock).toHaveBeenCalled();
});

it('sets type attribute correctly', () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
});

it('applies additional classes correctly', () => {
    render(<Button className="extra-class">Button with extra class</Button>);

    expect(screen.getByRole('button')).toHaveClass('button extra-class');
});