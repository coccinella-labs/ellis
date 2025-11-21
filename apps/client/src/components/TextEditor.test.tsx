import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TextEditor } from './TextEditor';

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('TextEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders textarea with placeholder', () => {
    render(<TextEditor />);
    const textarea = screen.getByPlaceholderText('Start typing...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-testid', 'input-editor');
  });

  it('updates text when user types', () => {
    const onTextChange = vi.fn();
    render(<TextEditor onTextChange={onTextChange} />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(textarea).toHaveValue('Hello world');
    expect(onTextChange).toHaveBeenCalledWith('Hello world');
  });

  it('does not generate suggestion for short text', () => {
    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');
    fireEvent.change(textarea, { target: { value: 'Hi' } });

    // Advance timers to trigger debounced call
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('debounces API calls', () => {
    render(<TextEditor />);

    const textarea = screen.getByTestId('input-editor');

    // Type multiple times quickly
    fireEvent.change(textarea, { target: { value: 'H' } });
    fireEvent.change(textarea, { target: { value: 'He' } });
    fireEvent.change(textarea, { target: { value: 'Hel' } });
    fireEvent.change(textarea, { target: { value: 'Hell' } });
    fireEvent.change(textarea, {
      target: { value: 'Hello world this is a longer text' },
    });

    // Only advance 400ms - should not trigger yet
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(fetchMock).not.toHaveBeenCalled();

    // Advance to 500ms - should trigger
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
