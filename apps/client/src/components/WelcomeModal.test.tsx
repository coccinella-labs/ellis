import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { WelcomeModal } from './WelcomeModal';
describe('WelcomeModal', () => {
  it('renders when open', () => {
    const { container } = render(
      <WelcomeModal isOpen={true} onOpenChange={vi.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
