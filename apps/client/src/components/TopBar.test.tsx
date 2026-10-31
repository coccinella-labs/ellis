import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { TopBar } from './TopBar';

const localStorageMock = {
  getItem: vi.fn(() => null),
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
});
