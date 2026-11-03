import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  let changeHandler: (() => void) | undefined;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_event: string, handler: () => void) => {
          changeHandler = handler;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  it('returns true on a mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the viewport changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
    const { result } = renderHook(() => useIsMobile());
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    act(() => {
      changeHandler?.();
    });
    expect(result.current).toBe(true);
  });
});
