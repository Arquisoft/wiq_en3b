import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  act(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
  });
});
