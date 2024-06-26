import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const ContinuousSlider = ({ volume, handleVolumeChange }) => {

    return (
        <Box sx={{ height: 300 }}>
            <Stack spacing={2} direction="column" sx={{
                mb: 1,
                '& .MuiSlider-thumb': {
                    bgcolor: '#717bee',
                }, '& .MuiSlider-track': {
                    bgcolor: '#717bee',
                }
            }} alignItems="center">
                <VolumeUp />
                <Box sx={{ height: 220 }}>
                    <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} orientation="vertical" defaultValue={50} />
                </Box>
                <VolumeDown />
            </Stack>
        </Box>
    );
}

export default ContinuousSlider;
