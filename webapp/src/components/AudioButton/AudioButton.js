import React, { useState, useEffect } from "react";
import { ReactComponent as SoundIcon } from "../../assets/sound.svg";
import { ReactComponent as MuteIcon } from "../../assets/mute.svg";
import "./AudioButton.css";
import "../Header/Header.css";
import song from "../../assets/music.mp3";

const AudioButton = ({ volume }) => {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const audioElement = new Audio(song);
        audioElement.loop = true;
        audioElement.volume = volume / 100;
        setAudio(audioElement);
    }, []);

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
        }
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
        //onChangeSound(!playing);
    };

    return (
        <div className="sound" onClick={toggleAudio} data-testid="audio-button" tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    toggleAudio();
                }
            }}>
            {playing ? <SoundIcon data-testid="sound-icon" /> : <MuteIcon data-testid="mute-icon" />}
        </div>
    );
};
export default AudioButton;