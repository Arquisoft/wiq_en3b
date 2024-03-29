import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const ContinuousSlider = ({ volume, handleVolumeChange }) => {

    return (
        <Box sx={{ width: 300 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown />
                <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} />
                <VolumeUp />
            </Stack>
        </Box>
    );
}

export default ContinuousSlider;