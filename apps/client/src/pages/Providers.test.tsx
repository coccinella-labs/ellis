import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ProvidersPage } from './Providers';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ProvidersPage', () => {
  it('renders when open', () => {
    const { container } = render(
      <ProvidersPage isOpen={true} onOpenChange={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
