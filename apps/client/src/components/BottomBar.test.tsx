import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BottomBar } from './BottomBar';

describe('BottomBar', () => {
  it('renders', () => {
    const { container } = render(
      <BottomBar wordCount={5} suggestionsAccepted={2} />
    );
    expect(container).toBeTruthy();
  });
});
