import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StatusBar } from './StatusBar';
describe('StatusBar', () => {
  it('renders', () => {
    const { container } = render(<StatusBar />);
    expect(container).toBeTruthy();
  });
});
