import { getNormalizedCoordinates } from './CoordinateUtils';
import { describe, it, expect, vi } from 'vitest';

describe('getNormalizedCoordinates', () => {
  it('should calculate normalized coordinates correctly', () => {
    const e = {
      target: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 100,
        }),
        naturalWidth: 200,
        naturalHeight: 200,
      },
      clientX: 50,
      clientY: 50,
    };

    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);

    expect(normalizedX).toBe(100);
    expect(normalizedY).toBe(100);
  });

  //Error logging
  it('should log an error if the image is not fully loaded', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const e = {
      target: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 100,
          height: 100,
        }),
        naturalWidth: 0,
        naturalHeight: 0,
      },
      clientX: 50,
      clientY: 50,
    };

    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);

    expect(consoleSpy).toHaveBeenCalledWith('Image not fully loaded');

    expect(normalizedX).toBe(0);
    expect(normalizedY).toBe(0);

    consoleSpy.mockRestore();
  });
});
