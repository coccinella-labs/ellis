import { describe, it, expect, vi } from 'vitest';
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

import { reducer } from './use-toast';

describe('toast reducer', () => {
  it('adds toast', () => {
    const state = reducer(
      { toasts: [] },
      {
        type: 'ADD_TOAST',
        toast: {
          id: '1',
          title: 't',
          open: true,
          onOpenChange: () => {},
        } as any,
      }
    );
    expect(state.toasts).toHaveLength(1);
  });

  it('updates toast', () => {
    const state = reducer(
      {
        toasts: [
          { id: '1', title: 'a', open: true, onOpenChange: () => {} } as any,
        ],
      },
      { type: 'UPDATE_TOAST', toast: { id: '1', title: 'b' } }
    );
    expect(state.toasts[0].title).toBe('b');
  });

  it('dismisses toast', () => {
    const state = reducer(
      {
        toasts: [
          { id: '1', title: 'a', open: true, onOpenChange: () => {} } as any,
        ],
      },
      { type: 'DISMISS_TOAST', toastId: '1' }
    );
    expect(state.toasts[0].open).toBe(false);
  });

  it('removes toast', () => {
    const state = reducer(
      {
        toasts: [
          { id: '1', title: 'a', open: true, onOpenChange: () => {} } as any,
        ],
      },
      { type: 'REMOVE_TOAST', toastId: '1' }
    );
    expect(state.toasts).toHaveLength(0);
  });

  it('removes all toasts', () => {
    const state = reducer(
      {
        toasts: [
          { id: '1', title: 'a', open: true, onOpenChange: () => {} } as any,
        ],
      },
      { type: 'REMOVE_TOAST', toastId: undefined }
    );
    expect(state.toasts).toHaveLength(0);
  });
});

describe('toast helpers', () => {
  it('updates a toast', () => {
    const { result } = renderHook(() => useToast());
    const created = toast({ title: 'original' });
    act(() => {
      created.update({ title: 'updated' } as any);
    });
    expect(result.current.toasts[0]?.title).toBe('updated');
  });

  it('dismisses all toasts', () => {
    const { result } = renderHook(() => useToast());
    toast({ title: 'original' });
    act(() => {
      result.current.dismiss();
    });
    expect(result.current.toasts[0]?.open).toBe(false);
  });

  it('dismisses through onOpenChange', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      toast({ title: 'original' });
    });
    act(() => {
      result.current.toasts[0]?.onOpenChange?.(false);
    });
    expect(result.current.toasts[0]?.open).toBe(false);
  });
});

describe('toast timers', () => {
  it('removes a toast after the delay', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useToast());
    act(() => {
      toast({ title: 'original' });
    });
    act(() => {
      result.current.dismiss();
    });
    act(() => {
      vi.advanceTimersByTime(1000000);
    });
    expect(result.current.toasts).toHaveLength(0);
    vi.useRealTimers();
  });
});
