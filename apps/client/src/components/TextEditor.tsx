import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Sparkles } from 'lucide-react';

interface TextEditorProps {
  onTextChange?: (text: string) => void;
  onSuggestionAccept?: () => void;
  completionMode?: 'word' | 'sentence' | 'paragraph';
  writingStyle?: 'casual' | 'formal' | 'creative' | 'technical';
  aiProvider?: 'auto' | 'gemini' | 'sambanova' | 'openrouter' | 'atlascloud';
  geminiModel?: string;
  onGeminiModelChange?: (model: string) => void;
}

export function TextEditor({
  onTextChange,
  onSuggestionAccept,
  completionMode = 'sentence',
  writingStyle = 'casual',
  aiProvider = 'auto',
  geminiModel = 'gemini-3.8-flash',
  onGeminiModelChange,
}: TextEditorProps) {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModelSwitch, setShowModelSwitch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<number | undefined>();
  const requestSeqRef = useRef(0);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const generateSuggestion = async (
    currentText: string,
    overrideGeminiModel?: string
  ) => {
    if (currentText.length < 10) return;

    const mySeq = requestSeqRef.current;
    setIsGenerating(true);
    setShowModelSwitch(false);

    try {
      const effectiveGeminiModel = overrideGeminiModel ?? geminiModel;
      const response = await fetch('/api/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentText,
          mode: completionMode,
          style: writingStyle,
          provider: aiProvider,
          geminiModel: effectiveGeminiModel,
        }),
      });

      if (mySeq !== requestSeqRef.current) {
        return;
      }

      const data = await response.json();
      const newSuggestion = data.suggestion || '';
      setSuggestion(newSuggestion);
      if (!newSuggestion) {
        setShowModelSwitch(true);
      }
    } catch (error) {
      if (mySeq !== requestSeqRef.current) {
        return;
      }
      console.error('Error generating suggestion:', error);
      setSuggestion('');
      setShowModelSwitch(true);
    } finally {
      if (mySeq === requestSeqRef.current) {
        setIsGenerating(false);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange?.(newText);

    requestSeqRef.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSuggestion('');
    setShowModelSwitch(false);

    if (newText.length < 10) {
      setIsGenerating(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      generateSuggestion(newText);
    }, 500) as unknown as number;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showModelSwitch) {
      if (e.key === '1') {
        e.preventDefault();
        console.log('Switching to gemini-3.8-flash');
        const nextModel = 'gemini-3.8-flash';
        onGeminiModelChange?.(nextModel);
        setShowModelSwitch(false);
        generateSuggestion(text, nextModel);
      } else if (e.key === '2') {
        e.preventDefault();
        console.log('Switching to gemini-3.5-flash-lite');
        const nextModel = 'gemini-3.5-flash-lite';
        onGeminiModelChange?.(nextModel);
        setShowModelSwitch(false);
        generateSuggestion(text, nextModel);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        console.log('Dismissing model switch');
        setShowModelSwitch(false);
      }
      return;
    }

    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      const newText = text + suggestion;
      setText(newText);
      setSuggestion('');
      onTextChange?.(newText);
      onSuggestionAccept?.();
    } else if (e.key === 'Escape' && suggestion) {
      e.preventDefault();
      setSuggestion('');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent text-foreground text-base leading-relaxed resize-none focus:outline-none focus:ring-0 border-0 p-0"
          placeholder="Start typing..."
          data-testid="input-editor"
        />

        {suggestion && (
          <div className="absolute top-0 left-0 pointer-events-none whitespace-pre-wrap text-base leading-relaxed p-0">
            <span className="invisible">{text}</span>
            <span
              className="text-ai-suggestion italic opacity-75"
              data-testid="text-suggestion"
            >
              {suggestion}
            </span>
          </div>
        )}
      </div>

      {suggestion && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2 opacity-50"
          data-testid="panel-suggestion-controls"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-ai-suggestion-dim/30 rounded-full backdrop-blur-sm">
            <Sparkles className="w-2.5 h-2.5 text-ai-suggestion" />
            <span className="text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Tab</kbd>{' '}
              accept •{' '}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Esc</kbd>{' '}
              dismiss
            </span>
          </div>
        </div>
      )}

      {isGenerating && !suggestion && (
        <div
          className="absolute bottom-2 left-0 right-0 flex justify-center"
          data-testid="status-generating"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-background/50 rounded-full backdrop-blur-sm opacity-40">
            <div className="w-1 h-1 bg-ai-suggestion rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">thinking</span>
          </div>
        </div>
      )}

      {showModelSwitch && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-2 px-3 py-2 bg-background/80 rounded-lg backdrop-blur-sm border">
            <span className="text-xs text-muted-foreground">
              No suggestion generated. Press key to switch model:
            </span>
            <div className="flex gap-2">
              <span className="text-xs">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">1</kbd>{' '}
                gemini-3.8-flash
              </span>
              <span className="text-xs">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">2</kbd>{' '}
                gemini-3.5-flash-lite
              </span>
              <span className="text-xs">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">3</kbd>{' '}
                gemini-3.8-flash
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
