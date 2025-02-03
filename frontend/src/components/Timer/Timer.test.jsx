import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timer } from './Timer';
import { act } from 'react';

describe('Timer component', () => {
  it('should render a Timer component on page load', () => {
    render(<Timer hasWon={false} onTimerStop={() => {}} />);
    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  it('should contain a stopped state with default of false', () => {
    render(<Timer />);
    const timer = screen.getByTestId('timer');
    expect(timer).toHaveTextContent(/0 seconds/i);
  });

  it('should update elapsed time every second', () => {
    vi.useFakeTimers();
    render(<Timer hasWon={false} onTimerStop={() => {}} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent(/3 seconds/i);

    vi.useRealTimers();
  });

  it('should stop updating when hasWon is true', () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <Timer hasWon={false} onTimerStop={() => {}} />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent(/3 seconds/i);

    act(() => {
      rerender(<Timer hasWon={true} onTimerStop={() => {}} />);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent(/3 seconds/i);

    vi.useRealTimers();
  });

  it('should call onTimerStop with final time when won', () => {
    vi.useFakeTimers();

    const onTimerStopMock = vi.fn();

    const { rerender } = render(
      <Timer hasWon={false} onTimerStop={onTimerStopMock} />
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    act(() => {
      rerender(<Timer hasWon={true} onTimerStop={onTimerStopMock} />);
    });

    expect(onTimerStopMock).toHaveBeenCalledWith(5);

    vi.useRealTimers();
  });
});
