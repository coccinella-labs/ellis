import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Editor from './Editor';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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
  it('renders', () => {
    const { container } = render(
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });
});
