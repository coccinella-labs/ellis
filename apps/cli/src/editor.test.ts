/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest';
import { TextEditor } from './editor';

vi.mock('./gemini', () => ({
  generateTextCompletion: vi.fn().mockResolvedValue(' suggestion'),
}));

describe('TextEditor CLI', () => {
  it('constructs and handles help', async () => {
    const editor = new TextEditor({ mode: 'sentence', style: 'casual' });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).handleInput('.help');
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
