import { TopBar } from '../TopBar';
import { ThemeProvider } from '../ThemeProvider';
import { useState } from 'react';

export default function TopBarExample() {
  const [title, setTitle] = useState('My Document');

  return (
    <ThemeProvider>
      <TopBar
        documentTitle={title}
        onTitleChange={setTitle}
        onSettingsClick={() => {}}
        onExportClick={() => {}}
      />
    </ThemeProvider>
  );
}
