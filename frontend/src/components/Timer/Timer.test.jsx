import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timer } from './Timer';

describe('Timer component', () => {
  it('should render a Timer component on page load', () => {
    render(<Timer />);
    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  it('should contain a stopped state with default of false', () => {
    render(<Timer />);
    const timer = screen.getByTestId('timer');

    expect(timer).toHaveTextContent(/0/i);
  });

  it('should display elapsed time', () => {
    render(<Timer />);
    expect(screen.getByTestId('timer')).toHaveTextContent(/\d+ seconds?/i);
  });
});
