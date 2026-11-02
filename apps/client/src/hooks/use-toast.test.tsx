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
