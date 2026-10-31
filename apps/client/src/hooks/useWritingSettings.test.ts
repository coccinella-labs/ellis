import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWritingSettings } from './useWritingSettings';

describe('useWritingSettings', () => {
  it('returns default values', () => {
    const { result } = renderHook(() => useWritingSettings());

    expect(result.current.completionMode).toBe('sentence');
    expect(result.current.writingStyle).toBe('casual');
    expect(result.current.aiProvider).toBe('auto');
    expect(result.current.geminiModel).toBe('gemini-3.8-flash');
  });

  it('allows updating completionMode', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setCompletionMode('word');
    });

    expect(result.current.completionMode).toBe('word');

    act(() => {
      result.current.setCompletionMode('paragraph');
    });

    expect(result.current.completionMode).toBe('paragraph');
  });

  it('allows updating writingStyle', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setWritingStyle('formal');
    });

    expect(result.current.writingStyle).toBe('formal');

    act(() => {
      result.current.setWritingStyle('technical');
    });

    expect(result.current.writingStyle).toBe('technical');
  });

  it('allows updating aiProvider', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setAiProvider('gemini');
    });

    expect(result.current.aiProvider).toBe('gemini');

    act(() => {
      result.current.setAiProvider('sambanova');
    });

    expect(result.current.aiProvider).toBe('sambanova');
  });

  it('allows updating geminiModel', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setGeminiModel('gemini-3.8-flash');
    });

    expect(result.current.geminiModel).toBe('gemini-3.8-flash');
  });

  it('maintains state across renders', () => {
    const { result, rerender } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setCompletionMode('word');
      result.current.setWritingStyle('creative');
      result.current.setAiProvider('gemini');
    });

    rerender();

    expect(result.current.completionMode).toBe('word');
    expect(result.current.writingStyle).toBe('creative');
    expect(result.current.aiProvider).toBe('gemini');
  });
});
