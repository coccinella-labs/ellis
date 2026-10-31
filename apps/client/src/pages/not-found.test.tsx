import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound', () => {
  it('renders', () => {
    const { container } = render(<NotFound />);
    expect(container).toBeTruthy();
  });
});
