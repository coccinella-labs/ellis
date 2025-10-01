import { SettingsPanel } from '../SettingsPanel';
import { ThemeProvider } from '../ThemeProvider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SettingsPanelExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [completionMode, setCompletionMode] = useState<
    'word' | 'sentence' | 'paragraph'
  >('sentence');
  const [writingStyle, setWritingStyle] = useState<
    'casual' | 'formal' | 'creative' | 'technical'
  >('casual');

  return (
    <ThemeProvider>
      <div className="relative h-96">
        <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
        <SettingsPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          autoSave={autoSave}
          onAutoSaveChange={setAutoSave}
          completionMode={completionMode}
          onCompletionModeChange={setCompletionMode}
          writingStyle={writingStyle}
          onWritingStyleChange={setWritingStyle}
        />
      </div>
    </ThemeProvider>
  );
}
