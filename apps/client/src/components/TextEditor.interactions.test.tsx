import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TextEditor } from './TextEditor';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('TextEditor interactions extra', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('switches model with key 2', async () => {
    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ suggestion: '' }),
    });
    const onGeminiModelChange = vi.fn();
    render(<TextEditor onGeminiModelChange={onGeminiModelChange} />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    fireEvent.keyDown(textarea, { key: '2' });
    expect(onGeminiModelChange).toHaveBeenCalledWith('gemini-3.5-flash-lite');
  });

  it('handles generation errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fail'));
    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    expect(textarea).toHaveValue('Hello world this is a longer text');
  });
});

describe('TextEditor model switch dismissal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    fetchMock.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ suggestion: '' }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('dismisses model switch with Escape', async () => {
    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(
      screen.queryByText(/Press key to switch model/i)
    ).not.toBeInTheDocument();
  });

  it('clears previous timeout on rapid typing', () => {
    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text again' },
    });

    expect(textarea).toHaveValue('Hello world this is a longer text again');
  });
});
