import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWritingSettings } from './useWritingSettings';

describe('useWritingSettings', () => {
  it('returns default values', () => {
    const { result } = renderHook(() => useWritingSettings());

    expect(result.current.autoSave).toBe(true);
    expect(result.current.completionMode).toBe('sentence');
    expect(result.current.writingStyle).toBe('casual');
    expect(result.current.aiProvider).toBe('auto');
    expect(result.current.geminiModel).toBe('gemini-3-pro-preview');
    expect(result.current.geminiApiKey).toBe('');
    expect(result.current.sambaNovaApiKey).toBe('');
  });

  it('allows updating autoSave', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setAutoSave(false);
    });

    expect(result.current.autoSave).toBe(false);
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
      result.current.setGeminiModel('gemini-2.5-pro');
    });

    expect(result.current.geminiModel).toBe('gemini-2.5-pro');
  });

  it('allows updating API keys', () => {
    const { result } = renderHook(() => useWritingSettings());

    act(() => {
      result.current.setGeminiApiKey('test-gemini-key');
      result.current.setSambaNovaApiKey('test-samba-key');
    });

    expect(result.current.geminiApiKey).toBe('test-gemini-key');
    expect(result.current.sambaNovaApiKey).toBe('test-samba-key');
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
