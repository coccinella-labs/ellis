import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((q) => ({
    matches: false,
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

describe('App', () => {
  it('renders', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
