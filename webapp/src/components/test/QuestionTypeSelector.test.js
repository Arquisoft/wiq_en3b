import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import QuestionTypeSelector from '../QuestionTypeSelector/QuestionTypeSelector'
import '@testing-library/jest-dom'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}))

describe('QuestionTypeSelector', () => {
  it('renders correctly with given props', () => {
    const onChange = jest.fn()
    const selectedTypes = ['type1']
    const types = ['type1', 'type2']

    render(
      <QuestionTypeSelector
        onChange={onChange}
        selectedTypes={selectedTypes}
        types={types}
      />
    )

    expect(
      screen.getByText('play.gamemode.custom.questionTypesTitle')
    ).toBeInTheDocument()
    expect(
      screen.getByText('play.gamemode.custom.questionTypes.type1')
    ).toBeInTheDocument()
    expect(
      screen.getByText('play.gamemode.custom.questionTypes.type2')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('play.gamemode.custom.questionTypes.type1')
    ).toHaveAttribute('checked')
    expect(
      screen.getByLabelText('play.gamemode.custom.questionTypes.type2')
    ).not.toHaveAttribute('checked')
  })

  it('calls onChange when checkbox is clicked', () => {
    const onChange = jest.fn()
    const selectedTypes = []
    const types = ['type1']

    render(
      <QuestionTypeSelector
        onChange={onChange}
        selectedTypes={selectedTypes}
        types={types}
      />
    )

    fireEvent.click(
      screen.getByLabelText('play.gamemode.custom.questionTypes.type1')
    )
    expect(onChange).toHaveBeenCalledWith('type1')
  })
})
