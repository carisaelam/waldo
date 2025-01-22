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
});
