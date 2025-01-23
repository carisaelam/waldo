import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as CoordinateUtils from '../../utils/CoordinateUtils';
import LevelImage from './LevelImage';

vi.mock('../../utils/CoordinateUtils', () => ({
  getNormalizedCoordinates: vi.fn(),
}));

vi.mock('../TargetBox/TargetBox', () => ({
  default: vi.fn(() => <div data-testid="mock-target-box" />),
}));

describe('LevelImage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Component rendering
  it('should render a LevelImage component', () => {
    render(<LevelImage src="level1img.jpg" alt="Level 1 image" />);
    const imgElement = screen.getByTestId('level-image-1');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'level1img.jpg');
    expect(imgElement).toHaveAttribute('alt', 'Level 1 image');
  });

  it('should render a component with a missing alt', () => {
    render(<LevelImage src="level2img.jpg" alt="" />);
    const imgElement = screen.getByTestId('level-image-1');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.alt).toEqual('');
  });

  it('should render a component with an undefined alt', () => {
    render(<LevelImage src="level2img.jpg" />);
    const imgElement = screen.getByTestId('level-image-1');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.alt).toEqual('');
  });

  it('should render a placeholder image if no src', () => {
    render(<LevelImage src="" alt="" />);
    const imgElement = screen.getByTestId('level-image-1');
    expect(imgElement.src).toEqual('https://placehold.co/400');
  });

  // Call onImageClick
  it('should call onImageClick with normalized coordinates when clicked', async () => {
    const onImageClick = vi.fn();
    CoordinateUtils.getNormalizedCoordinates.mockReturnValue({
      normalizedX: 0.5,
      normalizedY: 0.5,
    });
    render(
      <LevelImage src="test.jpg" alt="Test image" onImageClick={onImageClick} />
    );

    const img = screen.getByTestId('level-image-1');
    await userEvent.click(img);

    expect(onImageClick).toHaveBeenCalledWith(0.5, 0.5);
  });

  // Renders targetBox with props
  it('should render TargetBox with correct props', () => {
    const targetBoxCoords = [0.5, 0.5];
    render(
      <LevelImage src="test.jpg" alt="test" targetBoxCoords={targetBoxCoords} />
    );

    const targetBox = screen.getByTestId('mock-target-box');
    expect(targetBox).toBeInTheDocument();
  });

  it('should not throw error with valid props', () => {
    expect(() => {
      render(
        <LevelImage
          src="test.jpg"
          alt="Test image"
          onImageClick={() => {}}
          targetBoxCoords={[0, 0]}
        />
      );
    }).not.toThrow();
  });
});
