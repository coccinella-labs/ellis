import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

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
});
