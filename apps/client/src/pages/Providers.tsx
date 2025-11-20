import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProvidersPageProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProvidersPage({ isOpen, onOpenChange }: ProvidersPageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-providers">
        <DialogHeader>
          <DialogTitle>AI Providers</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-base leading-relaxed">
            Reliable AI completion with automatic fallback.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                Primary
              </h4>
              <div className="space-y-2 text-sm">
                <p>Google Gemini 3.0 Pro Preview</p>
                <p className="text-muted-foreground">
                  Advanced completions, latest model.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                Fallback
              </h4>
              <div className="space-y-2 text-sm">
                <p>SambaNova GPT-OSS-120B</p>
                <p className="text-muted-foreground">
                  Activates when Gemini hits limits.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                API Keys
              </h4>
              <div className="space-y-2 text-sm">
                <p>Enter your own keys in Settings.</p>
                <p>Upgrade to paid plans for higher limits.</p>
                <p>Keys are stored locally and securely.</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                How It Works
              </h4>
              <div className="space-y-2 text-sm">
                <p>Try Gemini first for speed.</p>
                <p>Switch to SambaNova on rate limits.</p>
                <p>Same settings work with both.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Never get stuck due to API limits.
            </p>

            <p className="text-xs text-muted-foreground">
              Questions?{' '}
              <a
                href="https://github.com/harpertoken/autofix/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Let us know
              </a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
