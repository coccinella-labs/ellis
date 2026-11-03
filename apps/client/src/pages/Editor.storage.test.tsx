import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Editor from './Editor';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn((key: string) => {
    if (key === 'hasVisited') throw new Error('storage full');
  }),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi
    .fn()
    .mockImplementation((q: string) => ({
      matches: false,
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
});
Object.defineProperty(URL, 'createObjectURL', {
  value: vi.fn(() => 'blob:url'),
  writable: true,
});
Object.defineProperty(URL, 'revokeObjectURL', {
  value: vi.fn(),
  writable: true,
});

vi.mock('../hooks/useWritingSettings', () => ({
  useWritingSettings: () => ({
    autoSave: true,
    setAutoSave: vi.fn(),
    completionMode: 'sentence',
    setCompletionMode: vi.fn(),
    writingStyle: 'casual',
    setWritingStyle: vi.fn(),
    aiProvider: 'auto',
    setAiProvider: vi.fn(),
    geminiModel: 'gemini-3.8-flash',
    setGeminiModel: vi.fn(),
    geminiApiKey: '',
    setGeminiApiKey: vi.fn(),
    sambaNovaApiKey: '',
    setSambaNovaApiKey: vi.fn(),
  }),
}));

describe('Editor storage error', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });
  it('handles localStorage error on welcome close', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    );
    // Find dialog and press Escape
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) fireEvent.keyDown(dialog, { key: 'Escape' });
    // Also try document
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
