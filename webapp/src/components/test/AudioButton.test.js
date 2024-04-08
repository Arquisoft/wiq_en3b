import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AudioButton from '../AudioButton/AudioButton';


describe('AudioButton component', () => {
    it('renders without crashing', () => {
        render(<AudioButton volume={50} />);
    });

    it('renders the sound icon when audio is playing', () => {
        const { getByTestId } = render(<AudioButton volume={50} />);
        fireEvent.click(getByTestId('audio-button'));
        expect(getByTestId('sound-icon')).toBeInTheDocument();
    });

    it('renders the mute icon when audio is paused', () => {
        const { getByTestId } = render(<AudioButton volume={50} />);
        expect(getByTestId('mute-icon')).toBeInTheDocument();
    });

    it('toggles audio when clicked', () => {
        const { getByTestId } = render(<AudioButton volume={50} />);
        const audioButton = getByTestId('audio-button');
        fireEvent.click(audioButton);
        expect(getByTestId('sound-icon')).toBeInTheDocument();
        fireEvent.click(audioButton);
        expect(getByTestId('mute-icon')).toBeInTheDocument();
    });
});