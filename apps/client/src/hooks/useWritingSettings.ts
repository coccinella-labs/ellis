import { useState } from 'react';

export function useWritingSettings() {
  const [completionMode, setCompletionMode] = useState<
    'word' | 'sentence' | 'paragraph'
  >('sentence');
  const [writingStyle, setWritingStyle] = useState<
    'casual' | 'formal' | 'creative' | 'technical'
  >('casual');
  const [aiProvider, setAiProvider] = useState<
    'auto' | 'gemini' | 'sambanova' | 'openrouter'
  >('auto');
  const [geminiModel, setGeminiModel] = useState('gemini-3.8-flash');

  return {
    completionMode,
    setCompletionMode,
    writingStyle,
    setWritingStyle,
    aiProvider,
    setAiProvider,
    geminiModel,
    setGeminiModel,
  };
}
