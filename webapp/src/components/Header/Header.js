import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon-solid.svg";
import AudioButton from "../AudioButton/AudioButton";
import Slider from "../../components/Slider/ContinuousSlider";
import "./Header.css";
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const Header = props => {
  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'GB'
    },
    {
      code: 'es',
      name: 'Español',
      country_code: 'ES'
    },
    {
      code: 'fr',
      name: 'Français',
      country_code: 'FR'
    }
  ];

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <header className="header">
      <Link className='homeButton' to="/">
        <img src="KaW.png" alt="Logo of Know and Win APP" />
      </Link>
      <LanguageSelector languages={languages} />
      <div className="options">
        <div className="theme" onClick={props.onChangeTheme} tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              props.onChangeTheme();
            }
          }} data-testid="theme-element">
          {props.theme === "light" ? <MoonIcon /> : <SunIcon />}
        </div>

        <AudioButton 
          url="../../assets/music.wav" 
          volume={props.volume} 
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        />

        {showVolumeSlider && (
          <div className="volume-slider-container">
            <Slider id="selectVolume" volume={props.volume} handleVolumeChange={props.handleVolumeChange} />
          </div>
        )}

        <div className="header-button" onClick={props.onToggleNav} tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              props.onToggleNav();
            }
          }} data-testid="navigation-element">
          <BarIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;