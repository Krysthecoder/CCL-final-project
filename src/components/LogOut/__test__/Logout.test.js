import { render, screen } from '@testing-library/react';
import ProfileMenu from '..';

test('renders header', () => {
  render(<ProfileMenu />);
  const headingElement = screen.getByDisplayValue(/Logout/i);
  expect(headingElement).toBeInTheDocument();
});
