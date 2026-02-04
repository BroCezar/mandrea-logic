import React from 'react';
import { render } from '@testing-library/react';
import { HulyClock } from '../app/components/HulyClock';

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  scale: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe('HulyClock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('uses requestAnimationFrame for animation loop (optimization)', () => {
    const setIntervalSpy = jest.spyOn(window, 'setInterval');
    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = render(<HulyClock />);

    // Expect setInterval NOT to be called (for the loop)
    expect(setIntervalSpy).not.toHaveBeenCalled();

    // Expect requestAnimationFrame to be called
    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    // Cleanup
    unmount();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
