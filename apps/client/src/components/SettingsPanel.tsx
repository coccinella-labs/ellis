import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
}: SettingsPanelProps) {
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
              data-testid="button-close-settings"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save" className="text-sm font-medium">
                  Auto-save
                </Label>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={onAutoSaveChange}
                  data-testid="switch-auto-save"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="completion-mode"
                  className="text-sm font-medium"
                >
                  Completion Mode
                </Label>
                <Select
                  value={completionMode}
                  onValueChange={(value) =>
                    onCompletionModeChange(
                      value as 'word' | 'sentence' | 'paragraph'
                    )
                  }
                >
                  <SelectTrigger
                    id="completion-mode"
                    data-testid="select-completion-mode"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="word">Word completion</SelectItem>
                    <SelectItem value="sentence">
                      Sentence continuation
                    </SelectItem>
                    <SelectItem value="paragraph">
                      Paragraph expansion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="writing-style" className="text-sm font-medium">
                  Writing Style
                </Label>
                <Select
                  value={writingStyle}
                  onValueChange={(value) =>
                    onWritingStyleChange(
                      value as 'casual' | 'formal' | 'creative' | 'technical'
                    )
                  }
                >
                  <SelectTrigger
                    id="writing-style"
                    data-testid="select-writing-style"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">About</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Harper Autofix helps you write faster with intelligent AI
                suggestions based on your writing patterns and style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
