import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { ThemeProvider } from '../ThemeProvider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function KeyboardShortcutsModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ThemeProvider>
      <Button onClick={() => setIsOpen(true)}>Show Shortcuts</Button>
      <KeyboardShortcutsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </ThemeProvider>
  );
}
