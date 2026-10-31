import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { SettingsPanel } from './SettingsPanel';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SettingsPanel', () => {
  it('renders when open', () => {
    const props = {
      isOpen: true,
      onClose: vi.fn(),
      completionMode: 'sentence' as const,
      onCompletionModeChange: vi.fn(),
      writingStyle: 'casual' as const,
      onWritingStyleChange: vi.fn(),
      aiProvider: 'auto' as const,
      onAiProviderChange: vi.fn(),
      geminiModel: 'gemini-3.8-flash',
      onGeminiModelChange: vi.fn(),
    };
    const { container } = render(
      <ThemeProvider>
        <SettingsPanel {...props} />
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });
});
