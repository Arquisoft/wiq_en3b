import React from 'react';
import { render, screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';
import '@testing-library/jest-dom/extend-expect';
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'

jest.mock('react-lottie');

i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'error_page.title':
            'Oops...',
          'error_page.description':
            'It seems you\'ve reached a page that\'s lost in cyberspace',
        },
      },
    },
  })

describe('PageNotFound component', () => {
    test('renders the heading and paragraph correctly', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <PageNotFound />
            </I18nextProvider>
        );
        const headingElement = screen.getByText("Oops...");
        const paragraphElement = screen.getByText("It seems you've reached a page that's lost in cyberspace"); // Use screen.getByText
        expect(headingElement).toBeInTheDocument();
        expect(paragraphElement).toBeInTheDocument();
    });

    test('renders the animation container correctly', () => {
        render(<I18nextProvider i18n={i18n}>
            <PageNotFound />
        </I18nextProvider>);
        const animationContainer = screen.getByTestId('animation-container');
        expect(animationContainer).toBeInTheDocument();
    });

});
