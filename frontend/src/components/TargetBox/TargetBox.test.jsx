import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TargetBox from './TargetBox';

describe('TargetBox component', () => {
  it('should render a TargetBox component when imageElement is provided', () => {
    const mockImageElement = { offsetWidth: 1000, offsetHeight: 500 };
    render(<TargetBox x={0.5} y={0.5} imageElement={mockImageElement} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toBeInTheDocument();
  });

  it('should position TargetBox correctly based on x and y', () => {
    const mockImageElement = { offsetWidth: 1000, offsetHeight: 500 };
    render(<TargetBox x={0.5} y={0.5} imageElement={mockImageElement} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toHaveStyle({
      top: '250px',
      left: '500px',
    });
  });

  it('should not render TargetBox when imageElement is missing', () => {
    render(<TargetBox x={0.5} y={0.5} />);
    const targetBox = screen.queryByTestId('target-box');
    expect(targetBox).not.toBeInTheDocument();
  });

  it('should handle zero values for x and y', () => {
    const mockImageElement = { offsetWidth: 1000, offsetHeight: 500 };
    render(<TargetBox x={0} y={0} imageElement={mockImageElement} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toHaveStyle({
      top: '0px',
      left: '0px',
    });
  });

  it('should handle values greater than 1 for x and y', () => {
    const mockImageElement = { offsetWidth: 1000, offsetHeight: 500 };
    render(<TargetBox x={1.5} y={1.5} imageElement={mockImageElement} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toHaveStyle({
      top: '750px',
      left: '1500px',
    });
  });
});
