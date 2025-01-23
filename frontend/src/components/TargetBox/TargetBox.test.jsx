import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TargetBox from './TargetBox';

describe('LevelImage component', () => {
  // Component rendering
  it('should render a TargetBox component', () => {
    render(<TargetBox />);
    const targetBox = screen.getByTestId('target-box');

    expect(targetBox).toBeInTheDocument();
  });

  it('should position TargetBox correctly based on x y', () => {
    const mockImageRef = {
      current: {
        naturalWidth: 1000,
        naturalHeight: 500,
      },
    };

    render(<TargetBox x={500} y={250} imageRef={mockImageRef} />);
    const targetBox = screen.getByTestId('target-box');

    expect(targetBox).toHaveStyle({
      top: '50%',
      left: '50%',
    });
  });

  it('should handle missing imageRef gracefully', () => {
    render(<TargetBox x={500} y={250} />);
    const targetBox = screen.getByTestId('target-box');

    expect(targetBox).toHaveStyle({
      top: 'NaN%',
      left: 'NaN%',
    });
  });

  it('should handle missing x and y gracefully', () => {
    const mockImageRef = {
      current: {
        naturalWidth: 1000,
        naturalHeight: 500,
      },
    };

    render(<TargetBox imageRef={mockImageRef} />);
    const targetBox = screen.getByTestId('target-box');

    expect(targetBox).toHaveStyle({
      top: 'NaN%',
      left: 'NaN%',
    });
  });

  it('should handle zero values for x and y', () => {
    const mockImageRef = {
      current: {
        naturalWidth: 1000,
        naturalHeight: 500,
      },
    };
    render(<TargetBox x={0} y={0} imageRef={mockImageRef} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toHaveStyle({
      top: '0%',
      left: '0%',
    });
  });

  it('should handle values greater than image dimensions', () => {
    const mockImageRef = {
      current: {
        naturalWidth: 1000,
        naturalHeight: 500,
      },
    };
    render(<TargetBox x={1500} y={750} imageRef={mockImageRef} />);
    const targetBox = screen.getByTestId('target-box');
    expect(targetBox).toHaveStyle({
      top: '150%',
      left: '150%',
    });
  });
});
