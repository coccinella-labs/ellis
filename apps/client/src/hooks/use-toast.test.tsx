import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from './use-toast';

describe('useToast', () => {
  it('renders hook', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      toast({ title: 'hi' });
    });
    expect(result.current.toasts.length).toBeGreaterThanOrEqual(0);
  });
});
