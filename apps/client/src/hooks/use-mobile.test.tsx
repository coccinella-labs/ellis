import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  it('returns boolean', () => {
    const spy = vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) =>
        ({
          matches: false,
          media: q,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        }) as unknown as MediaQueryList
    );

    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
    expect(result.current).toBe(false);

    spy.mockRestore();
  });

  it('registers a change listener', () => {
    const addSpy = vi.fn();
    const spy = vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) =>
        ({
          matches: false,
          media: q,
          addEventListener: addSpy,
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        }) as unknown as MediaQueryList
    );

    renderHook(() => useIsMobile());
    expect(addSpy).toHaveBeenCalledWith('change', expect.any(Function));

    spy.mockRestore();
  });
});
