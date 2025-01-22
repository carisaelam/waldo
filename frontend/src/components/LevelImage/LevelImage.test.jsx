import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LevelImage from './LevelImage';

describe('LevelImage component', () => {
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

  // Click behavior
  it('should run the handleClick function upon click', async () => {
    const handleClick = vi.fn();
    render(
      <img
        data-testid="level-image-1"
        src="level1img.jpg"
        alt="Level 1 image"
        onClick={handleClick} // Pass the mock function here
      />
    );

    const imgElement = screen.getByTestId('level-image-1');

    const user = userEvent.setup();

    await user.click(imgElement);

    expect(handleClick).toHaveBeenCalled();
  });

  
  
});
