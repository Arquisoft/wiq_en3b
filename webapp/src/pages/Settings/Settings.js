import "./Settings.css";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import React from 'react';
import { useTranslation } from "react-i18next";

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

      <div className="settings-option">
        <label htmlFor="selectLanguage">{t("settings.choose_lang")}</label>
        <LanguageSelector
          id="selectLanguage"
          languages={languages}
        />
      </div>

      <div className="settings-option">
        <label htmlFor="selectTimer">{t("settings.choose_seconds")}</label>
        <select
          name=""
          id="selectTimer"
          onChange={props.onChangeTimerValue}
          value={props.timerValue}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
