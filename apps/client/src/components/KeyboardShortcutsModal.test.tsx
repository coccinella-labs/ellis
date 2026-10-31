import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
describe('KeyboardShortcutsModal', () => {
  it('renders when open', () => {
    const { container } = render(
      <KeyboardShortcutsModal isOpen={true} onClose={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
