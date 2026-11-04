import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { ProvidersPage } from '@/pages/Providers';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  completionMode: 'word' | 'sentence' | 'paragraph';
  onCompletionModeChange: (mode: 'word' | 'sentence' | 'paragraph') => void;
  writingStyle: 'casual' | 'formal' | 'creative' | 'technical';
  onWritingStyleChange: (
    style: 'casual' | 'formal' | 'creative' | 'technical'
  ) => void;
  aiProvider: 'auto' | 'gemini' | 'sambanova' | 'openrouter' | 'atlascloud';
  onAiProviderChange: (
    provider: 'auto' | 'gemini' | 'sambanova' | 'openrouter' | 'atlascloud'
  ) => void;
  geminiModel: string;
  onGeminiModelChange: (model: string) => void;
}

function ProvidersLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-primary hover:text-primary/80 transition-colors underline"
    >
      Learn more
    </button>
  );
}

export function SettingsPanel({
  isOpen,
  onClose,
  completionMode,
  onCompletionModeChange,
  writingStyle,
  onWritingStyleChange,
  aiProvider,
  onAiProviderChange,
  geminiModel,
  onGeminiModelChange,
}: SettingsPanelProps) {
  const [showProviders, setShowProviders] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
          data-testid="overlay-settings"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l shadow-xl z-50 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="panel-settings"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="hover:bg-transparent"
              data-testid="button-close-settings"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <Tabs defaultValue="writing" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="writing" data-testid="tab-writing">
                  Writing
                </TabsTrigger>
                <TabsTrigger value="ai" data-testid="tab-ai">
                  AI
                </TabsTrigger>
              </TabsList>

              <TabsContent
                forceMount
                value="writing"
                className="space-y-4 mt-6"
              >
                <div className="space-y-3">
                  <label
                    htmlFor="completion-mode"
                    className="text-sm font-medium"
                  >
                    completion
                  </label>
                  <select
                    id="completion-mode"
                    value={completionMode}
                    onChange={(e) =>
                      onCompletionModeChange(
                        e.target.value as 'word' | 'sentence' | 'paragraph'
                      )
                    }
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="select-completion-mode"
                  >
                    <option value="word">word</option>
                    <option value="sentence">sentence</option>
                    <option value="paragraph">paragraph</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="writing-style"
                    className="text-sm font-medium"
                  >
                    style
                  </label>
                  <select
                    id="writing-style"
                    value={writingStyle}
                    onChange={(e) =>
                      onWritingStyleChange(
                        e.target.value as
                          | 'casual'
                          | 'formal'
                          | 'creative'
                          | 'technical'
                      )
                    }
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="select-writing-style"
                  >
                    <option value="casual">casual</option>
                    <option value="formal">formal</option>
                    <option value="creative">creative</option>
                    <option value="technical">technical</option>
                  </select>
                </div>
              </TabsContent>

              <TabsContent forceMount value="ai" className="space-y-4 mt-6">
                <div className="space-y-3">
                  <label htmlFor="ai-provider" className="text-sm font-medium">
                    ai provider
                  </label>
                  <select
                    id="ai-provider"
                    value={aiProvider}
                    onChange={(e) =>
                      onAiProviderChange(
                        e.target.value as
                          | 'auto'
                          | 'gemini'
                          | 'sambanova'
                          | 'openrouter'
                          | 'atlascloud'
                      )
                    }
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="select-ai-provider"
                  >
                    <option value="auto">auto</option>
                    <option value="gemini">gemini</option>
                    <option value="sambanova">sambanova</option>
                    <option value="openrouter">openrouter</option>
                    <option value="atlascloud">atlascloud</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="gemini-model" className="text-sm font-medium">
                    gemini model
                  </label>
                  <select
                    id="gemini-model"
                    value={geminiModel}
                    onChange={(e) => onGeminiModelChange(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="select-gemini-model"
                  >
                    <option value="gemini-3.8-flash">gemini-3.8-flash</option>
                    <option value="gemini-3.5-flash-lite">
                      gemini-3.5-flash-lite
                    </option>
                  </select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-6 border-t border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  AI writing assistant with fallback providers
                </p>
                <ProvidersLink onClick={() => setShowProviders(true)} />
              </div>
              <p className="text-sm text-muted-foreground">
                Private and local.{' '}
                <a
                  href="https://github.com/coccinella-labs/ellis/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  Report bugs
                </a>
                .
              </p>
            </div>

            <ProvidersPage
              isOpen={showProviders}
              onOpenChange={setShowProviders}
            />
          </div>
        </div>
      </div>
    </>
  );
}
