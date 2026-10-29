import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Mars Project home content', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /next shows/i })).toBeInTheDocument();
  expect(screen.getAllByAltText(/mars project/i).length).toBeGreaterThan(0);
});
