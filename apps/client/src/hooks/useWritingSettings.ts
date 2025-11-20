import { useState } from 'react';

export function useWritingSettings() {
  const [autoSave, setAutoSave] = useState(true);
  const [completionMode, setCompletionMode] = useState<
    'word' | 'sentence' | 'paragraph'
  >('sentence');
  const [writingStyle, setWritingStyle] = useState<
    'casual' | 'formal' | 'creative' | 'technical'
  >('casual');
  const [aiProvider, setAiProvider] = useState<'auto' | 'gemini' | 'sambanova'>(
    'auto'
  );

  return {
    autoSave,
    setAutoSave,
    completionMode,
    setCompletionMode,
    writingStyle,
    setWritingStyle,
    aiProvider,
    setAiProvider,
  };
}
