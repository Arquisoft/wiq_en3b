import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AudioButton from '../AudioButton/AudioButton';

describe('AudioButton component', () => {
    it('renders without crashing', () => {
        render(<AudioButton volume={50} />);
    });

    it('renders the sound icon when audio is playing', () => {
        render(<AudioButton volume={50} />);
        fireEvent.click(screen.getByTestId('audio-button'));
        expect(screen.getByTestId('sound-icon')).toBeInTheDocument();
    });

    it('renders the mute icon when audio is paused', () => {
        render(<AudioButton volume={50} />);
        expect(screen.getByTestId('mute-icon')).toBeInTheDocument();
    });

    it('toggles audio when clicked', () => {
        render(<AudioButton volume={50} />);
        const audioButton = screen.getByTestId('audio-button');
        fireEvent.click(audioButton);
        expect(screen.getByTestId('sound-icon')).toBeInTheDocument();
        fireEvent.click(audioButton);
        expect(screen.getByTestId('mute-icon')).toBeInTheDocument();
    });
});
