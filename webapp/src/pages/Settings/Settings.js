import "./Settings.css";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import Slider from "../../components/Slider/ContinuousSlider";
import React from 'react';
import { useTranslation } from "react-i18next";
import './Settings.css'

const Settings = (props) => {

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
    },
    {
      code: 'uk',
      name: 'Українська',
      country_code: 'uk'
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


    </div>
  );
}

export default Settings;
