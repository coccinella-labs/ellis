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

  it('handles save without output file', async () => {
    const editor = new TextEditor({ mode: 'sentence', style: 'casual' });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).handleInput('.save');
    expect(logSpy).toHaveBeenCalledWith('No output file. Use --output flag.');
    logSpy.mockRestore();
  });

  it('shows initial content on start', async () => {
    const editor = new TextEditor({
      mode: 'sentence',
      style: 'casual',
      initialContent: 'hello',
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).start();
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
