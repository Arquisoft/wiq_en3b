import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../context/AuthContext'
import XButton from '../XButton/XButton'

const mockUser = {}

describe('X Share Button', () => {

    test('renders without crashing', async () => {

        render(
            <AuthContext.Provider value={{ user: mockUser }}>
              <XButton></XButton>
            </AuthContext.Provider>
          )

        expect(await screen.findByText('Share your results')).toBeInTheDocument()
    })

})