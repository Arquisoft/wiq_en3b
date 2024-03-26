import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom'

describe('Input component', () => {
  it('renders input field with label', () => {
    const { getByLabelText } = render(<Input label="Name" />);
    const inputElement = getByLabelText('Name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('calls onChange handler when input value changes', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(<Input label="Name" onChange={onChangeMock} />);
    const inputElement = getByLabelText('Name');
    fireEvent.change(inputElement, { target: { value: 'John' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement.value).toBe('John');
  });
});
