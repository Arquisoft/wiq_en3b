import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import i18n from '../path/to/your/i18nConfig';
import Game from './Game';

test('renders without crashing', () => {
    render(
        <I18nextProvider i18n={i18n}>
            <Game />
        </I18nextProvider>
    );
});

test('renders difficulty selection when no level is selected', () => {
    const { getByText } = render(
        <I18nextProvider i18n={i18n}>
            <Game />
        </I18nextProvider>
    );
    expect(getByText('play.choose_difficulty')).toBeInTheDocument();
    expect(getByText('play.easy')).toBeInTheDocument();
    expect(getByText('play.medium')).toBeInTheDocument();
    expect(getByText('play.hard')).toBeInTheDocument();
});

test('difficulty selection disappears when a level is selected', () => {
    const { getByText, queryByText } = render(
        <I18nextProvider i18n={i18n}>
            <Game />
        </I18nextProvider>
    );
    fireEvent.click(getByText('play.easy'));
    expect(queryByText('play.choose_difficulty')).not.toBeInTheDocument();
    expect(queryByText('play.easy')).not.toBeInTheDocument();
    expect(queryByText('play.medium')).not.toBeInTheDocument();
    expect(queryByText('play.hard')).not.toBeInTheDocument();
});