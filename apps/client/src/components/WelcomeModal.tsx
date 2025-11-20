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
          <p className="text-base leading-relaxed">
            Write with an AI companion that knows your rhythm.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                Begin
              </h4>
              <div className="space-y-2 text-sm">
                <p>Start typing; watch suggestions unfold.</p>
                <p>
                  Tap{' '}
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Tab
                  </kbd>{' '}
                  to adopt them.
                </p>
                <p>
                  Tap{' '}
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Esc
                  </kbd>{' '}
                  to decline.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                Commands
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Secure</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Ctrl+S
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span>Extract</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Ctrl+E
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span>Tune</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Ctrl+,
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span>Reveal</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    Ctrl+/
                  </kbd>
                </div>
              </div>
            </div>

            <p className="text-sm">Refine your setup in preferences.</p>

            <p className="text-xs text-muted-foreground">
              Encounter issues?{' '}
              <a
                href="https://github.com/harpertoken/autofix/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Submit here
              </a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
