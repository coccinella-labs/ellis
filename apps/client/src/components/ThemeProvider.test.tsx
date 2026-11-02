import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { container } = render(
      <ThemeProvider>
        <span>child</span>
      </ThemeProvider>
    );
    expect(container.textContent).toContain('child');
  });

  it('applies the theme to the document root', () => {
    localStorageMock.getItem.mockReturnValue('light');
    render(
      <ThemeProvider>
        <span>child</span>
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('throws when useTheme is used outside a ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function Test() {
      useTheme();
      return null;
    }
    expect(() => render(<Test />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    spy.mockRestore();
  });
});
