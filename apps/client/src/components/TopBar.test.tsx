import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { TopBar } from './TopBar';

const localStorageMock = {
  getItem: vi.fn(() => 'dark'),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TopBar', () => {
  it('renders', () => {
    const { container } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="t"
          onTitleChange={vi.fn()}
          onSettingsClick={vi.fn()}
          onExportClick={vi.fn()}
        />
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });

  it('toggles theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TopBar
          documentTitle="t"
          onTitleChange={vi.fn()}
          onSettingsClick={vi.fn()}
          onExportClick={vi.fn()}
        />
      </ThemeProvider>
    );
    fireEvent.click(
      document.querySelector('[data-testid="button-theme-toggle"]')!
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
