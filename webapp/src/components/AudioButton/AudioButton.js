import React, { useState, useEffect } from "react";
import { ReactComponent as SoundIcon } from "../../assets/sound.svg";
import { ReactComponent as MuteIcon } from "../../assets/mute.svg";
import "./AudioButton.css";
import "../Header/Header.css";
import song from "../../assets/music.mp3";
import Slider from "../../components/Slider/ContinuousSlider"; 

const AudioButton = () => {
    const [playing, setPlaying] = useState(false);
    const [audio] = useState(new Audio(song));
    const [volume, setVolume] = useState(30);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false); 
    const [hideTimeout, setHideTimeout] = useState(null);

    useEffect(() => {
        audio.loop = true;
        audio.volume = volume / 100;
    }, [volume]);

    const play = () => {
        audio.play();
    };

    const pause = () => {
        audio.pause();
    };

    const toggleAudio = () => {
        if (playing) {
            pause();
        } else {
            play();
        }
        setPlaying(!playing);
    };

    const handleMouseEnter = () => {
        clearTimeout(hideTimeout);
        setShowVolumeSlider(true);
    };

    const handleMouseLeave = () => {
        setHideTimeout(setTimeout(() => {
            setShowVolumeSlider(false);
        }, 500));
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    return (
    <div className="audio-button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="sound" onClick={toggleAudio} data-testid="audio-button" tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    toggleAudio();
                }
            }}>
            {playing ? <SoundIcon data-testid="sound-icon" /> : <MuteIcon data-testid="mute-icon" />}
        </div>
        <div className={`volume-slider-container ${showVolumeSlider ? 'show' : ''}`}>
            <Slider volume={volume} handleVolumeChange={handleVolumeChange} />
        </div>
    </div>
    );
};

export default AudioButton;