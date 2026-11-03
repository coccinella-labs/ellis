import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TextEditor } from './TextEditor';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('TextEditor stale request guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ignores a stale suggestion response', async () => {
    let resolveFirst: (value: any) => void;
    fetchMock.mockImplementation(() => {
      if (!resolveFirst) {
        return new Promise((resolve) => {
          resolveFirst = resolve;
        });
      }
      return Promise.resolve({
        json: vi.fn().mockResolvedValue({ suggestion: ' second' }),
      });
    });

    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text again' },
    });

    await act(async () => {
      resolveFirst({
        json: vi.fn().mockResolvedValue({ suggestion: ' stale' }),
      });
      await Promise.resolve();
    });

    expect(screen.queryByTestId('text-suggestion')).not.toBeInTheDocument();
  });

  it('ignores a stale generation error', async () => {
    let rejectFirst: (reason?: any) => void;
    fetchMock.mockImplementation(() => {
      if (!rejectFirst) {
        return new Promise((_resolve, reject) => {
          rejectFirst = reject;
        });
      }
      return Promise.resolve({
        json: vi.fn().mockResolvedValue({ suggestion: ' second' }),
      });
    });

    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text again' },
    });

    await act(async () => {
      rejectFirst(new Error('fail'));
      await Promise.resolve();
    });

    expect(textarea).toHaveValue('Hello world this is a longer text again');
  });
});
