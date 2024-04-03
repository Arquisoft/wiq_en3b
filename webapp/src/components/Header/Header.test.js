import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom'

describe('Header component', () => {

  it('calls onChangeTheme prop when theme button is clicked', () => {
    const onChangeThemeMock = jest.fn();
    const { getByTestId } = render(
      <Header theme="light" onChangeTheme={onChangeThemeMock} onToggleNav={() => {}} />
    );

    const themeButton = getByTestId('theme-button');
    fireEvent.click(themeButton);
    expect(onChangeThemeMock).toHaveBeenCalled();
  });

  it('calls onToggleNav prop when navigation button is clicked', () => {
    const onToggleNavMock = jest.fn();
    const { getByTestId } = render(
      <Header theme="light" onChangeTheme={() => {}} onToggleNav={onToggleNavMock} />
    );

    const navButton = getByTestId('nav-button');
    fireEvent.click(navButton);
    expect(onToggleNavMock).toHaveBeenCalled();
  });
});
