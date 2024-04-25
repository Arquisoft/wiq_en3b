import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import PasswordField from '../../components/PasswordField/PasswordField'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'



i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                'login.username_placeholder': 'Username',
                'register.password_placeholder': 'Password'
            },
        },
    },
})


const renderPasswordField = _ =>
    render(
        <MemoryRouter>
            <I18nextProvider i18n={i18n}>
                <PasswordField password="12345678" setPassword={() => {}} />
            </I18nextProvider>
        </MemoryRouter>
    )


describe('password field tests', () => {
   
    test('hide password', () => {
        renderPasswordField()
        const inputElement = screen.getByPlaceholderText('Password')
        expect(inputElement).toHaveAttribute('type', 'password')
    })

    test('show password', () => {
        renderPasswordField()
        fireEvent.click(screen.getByRole('button'))
        const inputElement = screen.getByPlaceholderText('Password')
        expect(inputElement).toHaveAttribute('type', 'text')
    })
})