import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ProvidersPage } from '@/pages/Providers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SettingsSelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  testId: string;
}

function SettingsSelect<T extends string>({
  id,
  label,
  value,
  onValueChange,
  options,
  testId,
}: SettingsSelectProps<T>) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={(value) => onValueChange(value as T)}
      >
        <SelectTrigger id={id} data-testid={testId} className="h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  autoSave: boolean;
  onAutoSaveChange: (enabled: boolean) => void;
  completionMode: 'word' | 'sentence' | 'paragraph';
  onCompletionModeChange: (mode: 'word' | 'sentence' | 'paragraph') => void;
  writingStyle: 'casual' | 'formal' | 'creative' | 'technical';
  onWritingStyleChange: (
    style: 'casual' | 'formal' | 'creative' | 'technical'
  ) => void;
  aiProvider: 'auto' | 'gemini' | 'sambanova';
  onAiProviderChange: (provider: 'auto' | 'gemini' | 'sambanova') => void;
  geminiApiKey: string;
  onGeminiApiKeyChange: (key: string) => void;
  sambaNovaApiKey: string;
  onSambaNovaApiKeyChange: (key: string) => void;
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
  autoSave,
  onAutoSaveChange,
  completionMode,
  onCompletionModeChange,
  writingStyle,
  onWritingStyleChange,
  aiProvider,
  onAiProviderChange,
  geminiApiKey,
  onGeminiApiKeyChange,
  sambaNovaApiKey,
  onSambaNovaApiKeyChange,
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
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-muted-foreground">
                  Craft
                </h3>
                <div className="space-y-4">
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
                      className="h-10 w-full border rounded px-3"
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
                      className="h-10 w-full border rounded px-3"
                      data-testid="select-writing-style"
                    >
                      <option value="casual">casual</option>
                      <option value="formal">formal</option>
                      <option value="creative">creative</option>
                      <option value="technical">technical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gemini-key" className="text-sm font-medium">
                      Gemini API Key
                    </Label>
                    <Input
                      id="gemini-key"
                      type="password"
                      value={geminiApiKey}
                      onChange={(e) => onGeminiApiKeyChange(e.target.value)}
                      placeholder="Enter your Gemini API key"
                      data-testid="input-gemini-key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="sambanova-key"
                      className="text-sm font-medium"
                    >
                      SambaNova API Key
                    </Label>
                    <Input
                      id="sambanova-key"
                      type="password"
                      value={sambaNovaApiKey}
                      onChange={(e) => onSambaNovaApiKeyChange(e.target.value)}
                      placeholder="Enter your SambaNova API key"
                      data-testid="input-sambanova-key"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-muted-foreground">
                  Flow
                </h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save" className="text-sm font-medium">
                    auto-save
                  </Label>
                  <Switch
                    id="auto-save"
                    checked={autoSave}
                    onCheckedChange={onAutoSaveChange}
                    data-testid="switch-auto-save"
                  />
                </div>
              </div>
            </div>

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
                  href="https://github.com/harpertoken/autofix/issues"
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
