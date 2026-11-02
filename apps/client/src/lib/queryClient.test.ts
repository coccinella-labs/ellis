import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiRequest, getQueryFn } from './queryClient';

const fetchMock = vi.fn();
global.fetch = fetchMock;

const queryContext = {
  client: {} as never,
  queryKey: ['api', 'test'],
  signal: new AbortController().signal,
  meta: undefined,
};

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

  it('apiRequest throws on network failure', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    await expect(apiRequest('GET', '/api/test')).rejects.toThrow(
      'network down'
    );
  });

  it('getQueryFn returns null on 401 when configured', async () => {
    fetchMock.mockResolvedValue({ status: 401, ok: false });
    const fn = getQueryFn({ on401: 'returnNull' });
    const result = await fn(queryContext);
    expect(result).toBeNull();
  });

  it('getQueryFn throws on 401 when configured to throw', async () => {
    fetchMock.mockResolvedValue({
      status: 401,
      ok: false,
      text: async () => 'unauthorized',
      statusText: 'Unauthorized',
    });
    const fn = getQueryFn({ on401: 'throw' });
    await expect(fn(queryContext)).rejects.toThrow('401: unauthorized');
  });

  it('getQueryFn returns json on 200', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ hello: 'world' }),
    });
    const fn = getQueryFn({ on401: 'throw' });
    const result = await fn(queryContext);
    expect(result).toEqual({ hello: 'world' });
  });

  it('getQueryFn throws on 500', async () => {
    fetchMock.mockResolvedValue({
      status: 500,
      ok: false,
      text: async () => 'server error',
      statusText: 'Internal',
    });
    const fn = getQueryFn({ on401: 'throw' });
    await expect(fn(queryContext)).rejects.toThrow('500: server error');
  });
});
