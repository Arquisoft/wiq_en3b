import React from 'react';
import { render } from '@testing-library/react';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
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
    const { getByText } = render(<LanguageSelector languages={languages} />);


    const languageSelector = getByText(/English/i);
    expect(languageSelector).toBeTruthy();


    languages.forEach(language => {
        const option = getByText(language.name);
        expect(option).toBeTruthy();
    });
});
