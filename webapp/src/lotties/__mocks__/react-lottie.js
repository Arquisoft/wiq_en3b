// __mocks__/react-lottie.js
import React from 'react';

const MockLottie = ({ options: _ }) => { // Suppress the warning by using `_`
    return <div data-testid="mock-lottie-animation">Mock Lottie Animation</div>;
};

export default MockLottie;
