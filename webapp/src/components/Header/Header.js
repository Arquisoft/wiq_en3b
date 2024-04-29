import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";
import { ReactComponent as SunIcon } from "../../assets/sun-solid.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon-solid.svg";
import AudioButton from "../AudioButton/AudioButton";
import Slider from "../../components/Slider/ContinuousSlider";
import "./Header.css";
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
// import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../../context/SettingsContext';

const Header = props => {

  // const {t} = useTranslation();
  const { toggleTheme } = useContext(SettingsContext);


  const languages = [
    {
      code: 'en',
      country_code: 'GB'
    },
    {
      code: 'es',
      country_code: 'ES'
    },
    {
      code: 'fr',
      country_code: 'FR'
    },
    {
      code: 'uk',
      country_code: 'UA'
    }
  ];

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', props.theme);
  }, [props.theme]);

  const handleClick = (event) => {
    props.onChangeTheme();
    toggleTheme();
  }

  return (
    <header className="header">
      <Link className='homeButton' to="/">
        <img src={props.theme === "light" ? "KaW.png" : "KaW_D.png"} alt="Logo of Know and Win APP" />
      </Link>
      
      <div className="options">
        <LanguageSelector languages={languages} />
        <div className="theme" onClick={handleClick} tabIndex={0}
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