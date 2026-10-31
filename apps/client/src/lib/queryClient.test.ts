import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryFunctionParams } from '@tanstack/react-query';
import { apiRequest, getQueryFn } from './queryClient';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('queryClient', () => {
  beforeEach(() => vi.clearAllMocks());

  it('apiRequest returns response on ok', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: async () => '',
      status: 200,
      statusText: 'OK',
    });
    const res = await apiRequest('GET', '/api/test');
    expect(res.ok).toBe(true);
  });

  it('apiRequest throws on not ok', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      text: async () => 'err',
      status: 400,
      statusText: 'Bad',
    });
    await expect(apiRequest('GET', '/api/test')).rejects.toThrow('400: err');
  });

  it('getQueryFn returns null on 401 when configured', async () => {
    fetchMock.mockResolvedValue({ status: 401, ok: false });
    const fn = getQueryFn({ on401: 'returnNull' });
    const result = await fn({
      queryKey: ['api', 'test'],
    } as QueryFunctionParams<unknown>);
    expect(result).toBeNull();
  });
});
