import React from 'react';
import { render } from '@testing-library/react';
import ContinuousSlider from '../../components/Slider/ContinuousSlider';

test('renders ContinuousSlider component', () => {

    const volume = 50;
    const handleVolumeChange = jest.fn();


    const { getByLabelText } = render(
        <ContinuousSlider volume={volume} handleVolumeChange={handleVolumeChange} />
    );


    const volumeSlider = getByLabelText('Volume');
    expect(volumeSlider).toBeTruthy();
});
