import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  vi.mock('./components/TargetBox/TargetBox', () => ({
    default: ({ x, y }) => (
      <div data-testid="target-box" data-x={x} data-y={y}>
        Mock TargetBox
      </div>
    ),
  }));

  // App component renders
  it('renders app component', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders correct heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /waldo/i });
    expect(heading).toHaveTextContent(/waldo/i);
  });

  it('should update targetBoxCoords state upon click', async () => {
    render(<App />);

    const image = screen.getByTestId('level-image-1');

    const user = userEvent.setup();
    await user.click(image);

    const targetBoxCoords = screen.getByTestId('target-box');

    expect(targetBoxCoords).toBeInTheDocument();
  });
});
