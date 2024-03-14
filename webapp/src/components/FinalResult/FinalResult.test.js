import React from 'react';
import { render } from '@testing-library/react';
import FinalResult from './FinalResult';
import '@testing-library/jest-dom'

describe('FinalResult component', () => {
    it ('FinalResult renders without crashing', () => {
        const result = 5;
        const quizLength = 15;
        const { getByText } = render(<FinalResult result={result} quizLength={quizLength} />);
        const resultText = getByText(`You answered ${result} question correct out of ${quizLength}.`);
        expect(resultText).toBeInTheDocument();
    })
})