import React from 'react';
import './LanguageSelector.css';
import i18next from 'i18next';

const LanguageSelector = ({ languages }) => {

    return (
        <div className="language-selector">
            <select value={i18next.language} onChange={(event) => i18next.changeLanguage(event.target.value)}>
                {languages.map(({ code, name, country_code }) => (
                    <option key={country_code} value={code}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
