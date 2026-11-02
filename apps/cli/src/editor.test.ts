/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TextEditor } from './editor';

vi.mock('./gemini', () => ({
  generateTextCompletion: vi.fn(),
}));

vi.mock('fs', () => ({
  default: { writeFileSync: vi.fn() },
  writeFileSync: vi.fn(),
}));

describe('TextEditor CLI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('saves to output file', async () => {
    const fs = await import('fs');
    const editor = new TextEditor({
      mode: 'sentence',
      style: 'casual',
      outputFile: 'out.txt',
      initialContent: 'hello',
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).handleInput('.save');
    expect(
      (fs as any).writeFileSync || (fs as any).default.writeFileSync
    ).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Saved: out.txt');
    logSpy.mockRestore();
  });

  it('reports save failure', async () => {
    const fs = await import('fs');
    const write =
      (fs as any).writeFileSync || (fs as any).default.writeFileSync;
    write.mockImplementationOnce(() => {
      throw new Error('disk full');
    });
    const editor = new TextEditor({
      mode: 'sentence',
      style: 'casual',
      outputFile: 'out.txt',
      initialContent: 'hello',
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await (editor as any).handleInput('.save');
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('accepts suggestion on empty input', async () => {
    const editor = new TextEditor({ mode: 'sentence', style: 'casual' });
    (editor as any).suggestion = ' accepted';
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).handleInput('');
    expect((editor as any).text).toContain('accepted');
    logSpy.mockRestore();
  });

  it('generates suggestion for text', async () => {
    const gemini = await import('./gemini');
    vi.mocked(gemini.generateTextCompletion).mockResolvedValueOnce(
      ' suggestion'
    );
    const editor = new TextEditor({ mode: 'sentence', style: 'casual' });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).handleInput('hello');
    expect(gemini.generateTextCompletion).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(' suggestion');
    logSpy.mockRestore();
  });

  it('handles generation failure', async () => {
    const gemini = await import('./gemini');
    vi.mocked(gemini.generateTextCompletion).mockRejectedValueOnce(
      new Error('fail')
    );
    const editor = new TextEditor({ mode: 'sentence', style: 'casual' });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await (editor as any).handleInput('hello');
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('shows initial content on start', async () => {
    const editor = new TextEditor({
      mode: 'sentence',
      style: 'casual',
      initialContent: 'hello',
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await (editor as any).start();
    expect(logSpy).toHaveBeenCalledWith('hello');
    logSpy.mockRestore();
  });

  it('exits and saves', async () => {
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never);
    const editor = new TextEditor({
      mode: 'sentence',
      style: 'casual',
      outputFile: 'out.txt',
      initialContent: 'hello',
    });
    await (editor as any).handleInput('.exit');
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });
});
