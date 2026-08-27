import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Mars Project home content', () => {
  render(<App />);
  const subtitle = screen.getByText(/just some kids making music out of atlanta, georgia/i);
  expect(subtitle).toBeInTheDocument();
});
