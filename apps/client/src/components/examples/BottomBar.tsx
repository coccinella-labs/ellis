import { BottomBar } from '../BottomBar';
import { ThemeProvider } from '../ThemeProvider';

export default function BottomBarExample() {
  return (
    <ThemeProvider>
      <BottomBar
        wordCount={127}
        charCount={645}
        suggestionsAccepted={8}
        aiStatus="ready"
      />
    </ThemeProvider>
  );
}
