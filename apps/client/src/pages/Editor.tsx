import { useState, useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { TopBar } from '@/components/TopBar';
import { TextEditor } from '@/components/TextEditor';
import { BottomBar } from '@/components/BottomBar';
import { SettingsPanel } from '@/components/SettingsPanel';
import { KeyboardShortcutsModal } from '@/components/KeyboardShortcutsModal';

export default function Editor() {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [aiStatus, setAiStatus] = useState<'idle' | 'thinking' | 'ready'>(
    'ready'
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const [autoSave, setAutoSave] = useState(true);
  const [completionMode, setCompletionMode] = useState<
    'word' | 'sentence' | 'paragraph'
  >('sentence');
  const [writingStyle, setWritingStyle] = useState<
    'casual' | 'formal' | 'creative' | 'technical'
  >('casual');

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [text]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        console.log('Document saved');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleExport();
      } else if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle || 'document'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('Document exported');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <StatusBar />
      <TopBar
        documentTitle={documentTitle}
        onTitleChange={setDocumentTitle}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={handleExport}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-8 md:px-16 py-12 md:py-20 h-full">
          <TextEditor
            onTextChange={setText}
            onSuggestionAccept={() => setAcceptedCount((prev) => prev + 1)}
            completionMode={completionMode}
            writingStyle={writingStyle}
          />
        </div>
      </main>

      <BottomBar
        wordCount={wordCount}
        charCount={charCount}
        suggestionsAccepted={acceptedCount}
        aiStatus={aiStatus}
        onKeyboardShortcutsClick={() => setShortcutsOpen(true)}
      />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        autoSave={autoSave}
        onAutoSaveChange={setAutoSave}
        completionMode={completionMode}
        onCompletionModeChange={setCompletionMode}
        writingStyle={writingStyle}
        onWritingStyleChange={setWritingStyle}
      />

      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
}
