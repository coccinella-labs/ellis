import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WelcomeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeModal({ isOpen, onOpenChange }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-welcome">
        <DialogHeader>
          <DialogTitle>Welcome to Autofix</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-base leading-relaxed">AI writing companion.</p>

          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <p>Type for suggestions.</p>
              <p>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Tab</kbd>{' '}
                accept •{' '}
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd>{' '}
                reject
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>Save</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                  Ctrl+S
                </kbd>
              </div>
              <div className="flex justify-between">
                <span>Export</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                  Ctrl+E
                </kbd>
              </div>
              <div className="flex justify-between">
                <span>Settings</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                  Ctrl+,
                </kbd>
              </div>
              <div className="flex justify-between">
                <span>Help</span>
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                  Ctrl+/
                </kbd>
              </div>
            </div>

            <p className="text-sm">Configure in settings.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
