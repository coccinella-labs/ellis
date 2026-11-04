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
                <p>Google Gemini 3.8 Flash</p>
                <p className="text-muted-foreground">
                  Fast, efficient completions, default model.
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
                Free Auto-Router
              </h4>
              <div className="space-y-2 text-sm">
                <p>OpenRouter Free</p>
                <p className="text-muted-foreground">
                  Auto-selects a free model when no key is configured or all
                  others are exhausted. Zero cost.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                API Keys
              </h4>
              <div className="space-y-2 text-sm">
                <p>Keys are configured via environment variables.</p>
                <p>OpenRouter requires a key even for free models.</p>
                <p>Get one at openrouter.ai/keys.</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                How It Works
              </h4>
              <div className="space-y-2 text-sm">
                <p>Try Gemini first for speed.</p>
                <p>Switch to SambaNova on rate limits.</p>
                <p>OpenRouter free router as a last resort.</p>
                <p>Same settings work with all three.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Never get stuck due to API limits.
            </p>

            <p className="text-xs text-muted-foreground">
              Questions?{' '}
              <a
                href="https://github.com/coccinella-labs/ellis/issues"
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
