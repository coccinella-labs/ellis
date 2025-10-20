import { useState } from 'react';

export function useWritingSettings() {
  const [autoSave, setAutoSave] = useState(true);
  const [completionMode, setCompletionMode] = useState<
    'word' | 'sentence' | 'paragraph'
  >('sentence');
  const [writingStyle, setWritingStyle] = useState<
    'casual' | 'formal' | 'creative' | 'technical'
  >('casual');

  return {
    autoSave,
    setAutoSave,
    completionMode,
    setCompletionMode,
    writingStyle,
    setWritingStyle,
  };
}
