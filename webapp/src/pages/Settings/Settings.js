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
    }
  ]

  return (
    <div className="settings">
      <h1>{t("settings.title")}</h1>
    </div>
  );
}

export default Settings;
