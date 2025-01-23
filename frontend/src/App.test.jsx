import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  // App component renders
  it('renders app component', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders correct heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent(/waldo/i);
  });

  it('should update targetBoxCoords state upon click', async () => {
    const { getByTestId } = render(<App />);

    const image = getByTestId('level-image-1');

    const user = userEvent.setup();
    user.click(image);

    const targetBoxCoords = screen.getByTestId('target-box');

    expect(targetBoxCoords).toBeInTheDocument();
  });
});
