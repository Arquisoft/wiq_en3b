import "./Settings.css";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import Slider from "../../components/Slider/ContinuousSlider";
import React from 'react';
import { useTranslation } from "react-i18next";
import { useSettings } from '../../hooks/useSettings'
import './Settings.css'

// From 10 to 50 with step of 5
const possibleTimeValues = new Array(9)
  .fill(0)
  .map((_, index) => 5 + (index + 1) * 5)

const Settings = (props) => {
  const { time, changeTimeTo } = useSettings()

  const handleTimeChange = e => {
    changeTimeTo(e.target.value)
  }
  //Translation
  const { t } = useTranslation();

  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb'
    },
    {
      code: 'es',
      name: 'Español',
      country_code: 'es'
    },
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr'
    }
  ]

  return (
    <div className="settings">
      <h1>{t("settings.title")}</h1>

      <div className="settings-option">
        <label htmlFor="selectLanguage">{t("settings.choose_lang")}</label>
        <LanguageSelector
          id="selectLanguage"
          languages={languages}
        />
      </div>

      <div className="settings-option">
        <Slider id="selectVolume" volume={props.volume} handleVolumeChange={props.handleVolumeChange} />
      </div>

      <div className="settings-option">
        <label htmlFor="selectTimer">{t("settings.choose_seconds")}</label>
        <select name="" id="selectTimer" onChange={handleTimeChange} value={time}>
          {possibleTimeValues.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;
