import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i);
    expect(linkElement).toBeInTheDocument();
});
