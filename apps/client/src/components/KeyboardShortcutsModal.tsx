import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['Tab'], description: 'Accept AI suggestion' },
  { keys: ['Esc'], description: 'Dismiss AI suggestion' },
  { keys: ['Ctrl', 'S'], description: 'Save document' },
  { keys: ['Ctrl', 'E'], description: 'Export document' },
  { keys: ['Ctrl', ','], description: 'Open settings' },
  { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts' },
];

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-shortcuts">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="absolute right-4 top-4"
            data-testid="button-close-shortcuts"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
              data-testid={`shortcut-${index}`}
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 bg-muted rounded text-xs font-mono"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
