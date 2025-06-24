import { render, screen } from '@testing-library/react';
import App from './App';
// Removed unused imports: petanNaikLogo, usericon
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
