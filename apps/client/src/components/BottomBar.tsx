import { Sparkles, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomBarProps {
  wordCount: number;
  charCount: number;
  suggestionsAccepted: number;
  aiStatus: 'idle' | 'thinking' | 'ready';
  onKeyboardShortcutsClick: () => void;
}

export function BottomBar({
  wordCount,
  charCount,
  suggestionsAccepted,
  aiStatus,
  onKeyboardShortcutsClick,
}: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-200">
      <div className="flex items-center justify-center h-8 max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
          <div
            className="flex items-center gap-1.5"
            data-testid="text-word-count"
          >
            <span>{wordCount} words</span>
          </div>
          <div
            className="flex items-center gap-1.5"
            data-testid="text-suggestions-count"
          >
            <Sparkles className="w-3 h-3 text-ai-suggestion/60" />
            <span>{suggestionsAccepted}</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onKeyboardShortcutsClick}
            className="h-6 text-xs opacity-60 hover:opacity-100"
            data-testid="button-shortcuts"
          >
            <Keyboard className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Shortcuts</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
