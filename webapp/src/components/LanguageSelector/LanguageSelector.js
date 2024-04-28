import React, { useState, useEffect, useRef } from 'react';
import './LanguageSelector.css';
import i18next from 'i18next';

const LanguageSelector = ({ languages }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages.find(lang => lang.code === i18next.language));
    const languageSelectorRef = useRef(null);

    const handleLanguageChange = (language) => {
        i18next.changeLanguage(language.code);
        setSelectedLanguage(language);
        setShowOptions(false);
    };

    const handleClickOutside = (event) => {
        if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="language-selector" ref={languageSelectorRef}>
            <div className="selected-language" data-testid="selectedLanguage" onClick={() => setShowOptions(!showOptions)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    setShowOptions(!showOptions);
                }
            }}
            tabIndex={0}
            >
                <img className="flag"
                    src={`https://flagsapi.com/${selectedLanguage.country_code}/shiny/16.png`}
                    alt={selectedLanguage.name}
                    style={{ marginRight: '8px' }}
                />
                {selectedLanguage.name}
            </div>
            <div className={`language-options ${showOptions ? 'open' : 'close'}`}>
                {languages.map((language, index) => (
                    <div
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleLanguageChange(language);
                            }
                        }}
                        className="language-option"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        tabIndex={0}
                    >
                        <img
                            className="flag"
                            data-testid={`flag${language.code}`}
                            src={`https://flagsapi.com/${language.country_code}/shiny/16.png`}
                            alt={language.name}
                            style={{ marginRight: '8px' }}
                        />
                        {language.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;