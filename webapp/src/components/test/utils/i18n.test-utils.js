import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

export const runI18n = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ['en', 'es', 'fr'], // array of supported languages

      fallbackLng: 'es', // if the user selects a language that is not defined in the resources, the fallbackLng will be used

      detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
      },

      backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
      },

      react: {
        useSuspense: false,
      },
    })
}
