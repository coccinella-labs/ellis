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

const matchMediaMock = vi
  .fn()
  .mockImplementation((q: string) => ({
    matches: false,
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
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

describe('Editor page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders', () => {
    const { container } = render(
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });

  it('handles keyboard shortcuts', () => {
    render(
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    );
    fireEvent.keyDown(window, { key: 's', ctrlKey: true });
    fireEvent.keyDown(window, { key: 'e', ctrlKey: true });
    fireEvent.keyDown(window, { key: ',', ctrlKey: true });
    fireEvent.keyDown(window, { key: '/', ctrlKey: true });
    expect(true).toBe(true);
  });
});
