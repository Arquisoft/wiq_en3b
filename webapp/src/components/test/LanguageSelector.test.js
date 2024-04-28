import React from 'react';
import { render } from '@testing-library/react';
import {screen} from '@testing-library/dom'
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import i18n from 'i18next'

i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
            'languageSelector.language': 'English',
        },
      },
    },
  })

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
];

test('renders LanguageSelector component with language options', () => {
    expect(screen.queryByTestId('selectedLanguage')).toBeTruthy();
    languages.forEach(language => {
        let lang = `flag${language.code}`;
        expect(screen.queryByTestId(lang)).toBeTruthy();
    });
});
