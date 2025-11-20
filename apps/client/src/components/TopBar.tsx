import { Moon, Sun, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface TopBarProps {
  documentTitle: string;
  onTitleChange: (title: string) => void;
  onSettingsClick: () => void;
  onExportClick: () => void;
}

export function TopBar({
  documentTitle,
  onTitleChange,
  onSettingsClick,
  onExportClick,
}: TopBarProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between h-12 px-6 max-w-4xl mx-auto">
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-muted-foreground placeholder:text-muted-foreground/50 w-48"
          placeholder="Untitled"
          data-testid="input-document-title"
        />

        <div className="flex items-center gap-1 opacity-60">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className="h-8 w-8"
            data-testid="button-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onExportClick}
            className="h-8 w-8"
            data-testid="button-export"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onSettingsClick}
            className="h-8 w-8"
            data-testid="button-settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
