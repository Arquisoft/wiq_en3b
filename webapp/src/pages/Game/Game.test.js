import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next'; // Importa i18next directamente
import Game from './Game';
import { AuthContext } from '../../context/AuthContext'; // Asegúrate de importar AuthContext desde la ubicación correcta

// Crea un mock de i18next
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'play.choose_difficulty': 'Choose difficulty',
        'play.easy': 'Easy',
        'play.medium': 'Medium',
        'play.hard': 'Hard',
      },
    },
  },
});

// Define un usuario mock
const mockUser = {
  // Proporciona aquí los datos del usuario que necesitas para tus pruebas
};

test('renders difficulty selection when no level is selected', async () => {
    const { findByText } = render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <I18nextProvider i18n={i18n}>
                <Game />
            </I18nextProvider>
        </AuthContext.Provider>
    );
    expect(await findByText('Choose difficulty')).toBeInTheDocument();
    expect(await findByText('Easy')).toBeInTheDocument();
    expect(await findByText('Medium')).toBeInTheDocument();
    expect(await findByText('Hard')).toBeInTheDocument();
});

test('difficulty selection disappears when a level is selected', async () => {
    const { findByText, queryByText } = render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <I18nextProvider i18n={i18n}>
                <Game />
            </I18nextProvider>
        </AuthContext.Provider>
    );
    fireEvent.click(await findByText('Easy'));
    expect(queryByText('Choose difficulty')).not.toBeInTheDocument();
    expect(queryByText('Easy')).not.toBeInTheDocument();
    expect(queryByText('Medium')).not.toBeInTheDocument();
    expect(queryByText('Hard')).not.toBeInTheDocument();
});