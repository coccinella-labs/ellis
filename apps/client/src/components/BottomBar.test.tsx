import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BottomBar } from './BottomBar';

describe('BottomBar', () => {
  it('renders with Mac shortcut', () => {
    const originalPlatform = navigator.platform;
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      writable: true,
    });
    const { container } = render(
      <BottomBar wordCount={5} suggestionsAccepted={2} />
    );
    expect(container.textContent).toContain('⌘');
    Object.defineProperty(navigator, 'platform', {
      value: originalPlatform,
      writable: true,
    });
  });

  it('renders with Ctrl shortcut on non-Mac', () => {
    const originalPlatform = navigator.platform;
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      writable: true,
    });
    const { container } = render(
      <BottomBar wordCount={5} suggestionsAccepted={2} />
    );
    expect(container.textContent).toContain('Ctrl');
    Object.defineProperty(navigator, 'platform', {
      value: originalPlatform,
      writable: true,
    });
  });
});
