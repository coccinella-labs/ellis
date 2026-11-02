import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
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
  const baseProps = {
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

  it('renders when open', () => {
    const { container } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} />
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });

  it('closes when the close button is clicked', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} onClose={onClose} />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('button-close-settings'));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes when the overlay is clicked', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} onClose={onClose} />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('overlay-settings'));
    expect(onClose).toHaveBeenCalled();
  });

  it('switches between Writing and AI tabs', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('tab-ai'));
    expect(getByTestId('select-ai-provider')).toBeInTheDocument();
    fireEvent.click(getByTestId('tab-writing'));
    expect(getByTestId('select-completion-mode')).toBeInTheDocument();
  });

  it('changes completion mode', () => {
    const onCompletionModeChange = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel
          {...baseProps}
          onCompletionModeChange={onCompletionModeChange}
        />
      </ThemeProvider>
    );
    fireEvent.change(getByTestId('select-completion-mode'), {
      target: { value: 'paragraph' },
    });
    expect(onCompletionModeChange).toHaveBeenCalledWith('paragraph');
  });

  it('changes writing style', () => {
    const onWritingStyleChange = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel
          {...baseProps}
          onWritingStyleChange={onWritingStyleChange}
        />
      </ThemeProvider>
    );
    fireEvent.change(getByTestId('select-writing-style'), {
      target: { value: 'formal' },
    });
    expect(onWritingStyleChange).toHaveBeenCalledWith('formal');
  });

  it('changes AI provider', () => {
    const onAiProviderChange = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} onAiProviderChange={onAiProviderChange} />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('tab-ai'));
    fireEvent.change(getByTestId('select-ai-provider'), {
      target: { value: 'gemini' },
    });
    expect(onAiProviderChange).toHaveBeenCalledWith('gemini');
  });

  it('changes Gemini model', () => {
    const onGeminiModelChange = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel
          {...baseProps}
          onGeminiModelChange={onGeminiModelChange}
        />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('tab-ai'));
    fireEvent.change(getByTestId('select-gemini-model'), {
      target: { value: 'gemini-3.5-flash-lite' },
    });
    expect(onGeminiModelChange).toHaveBeenCalledWith('gemini-3.5-flash-lite');
  });

  it('opens the providers page when Learn more is clicked', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <SettingsPanel {...baseProps} />
      </ThemeProvider>
    );
    fireEvent.click(getByText('Learn more'));
    // Providers page should now be visible
    expect(getByTestId('modal-providers')).toBeInTheDocument();
  });
});
