import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ status: 'ok' }),
    } as Response);
    const { container } = render(<StatusBar />);
    expect(container).toBeTruthy();
    fetchSpy.mockRestore();
  });

  it('shows green dot when status is ok', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ status: 'ok' }),
    } as Response);
    const { container } = render(<StatusBar />);
    await waitFor(() => {
      expect(container.innerHTML).toContain('bg-green-500');
    });
    fetchSpy.mockRestore();
  });

  it('shows red dot when status is error', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ status: 'error' }),
    } as Response);
    const { container } = render(<StatusBar />);
    await waitFor(() => {
      expect(container.innerHTML).toContain('bg-red-500');
    });
    fetchSpy.mockRestore();
  });

  it('shows yellow dot on fetch failure', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('fail'));
    const { container } = render(<StatusBar />);
    await waitFor(() => {
      expect(container.innerHTML).toContain('bg-yellow-500');
    });
    fetchSpy.mockRestore();
  });
});
