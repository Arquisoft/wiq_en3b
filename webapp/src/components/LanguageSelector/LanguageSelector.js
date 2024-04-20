import React, { useState } from 'react';
import './LanguageSelector.css';
import i18next from 'i18next';

const LanguageSelector = ({ languages }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages.find(lang => lang.code === i18next.language));

    const handleLanguageChange = (language) => {
        i18next.changeLanguage(language.code);
        setSelectedLanguage(language);
        setShowOptions(false);
    };

    return (
        <div className="language-selector">
            <div className="selected-language" onClick={() => setShowOptions(!showOptions)}>
                <img className="flag"
                    src={`https://flagsapi.com/${selectedLanguage.country_code}/shiny/16.png`}
                    alt={selectedLanguage.name}
                    style={{ marginRight: '8px' }}
                />
                {selectedLanguage.name}
            </div>
            {showOptions && (
                <div className="language-options">
                    {languages.map(language => (
                        <div key={language.code} onClick={() => handleLanguageChange(language)}>
                            <img className="flag"
                                src={`https://flagsapi.com/${language.country_code}/shiny/16.png`}
                                alt={language.name}
                                style={{ marginRight: '8px' }}
                            />
                            {language.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;