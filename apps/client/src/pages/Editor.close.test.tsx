import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Editor from './Editor';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
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

describe('Editor welcome close', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });
  it('closes welcome modal', () => {
    render(
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hasVisited', 'true');
  });
});
